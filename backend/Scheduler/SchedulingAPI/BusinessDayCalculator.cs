using System.Text.Json;

namespace SchedulingAPI;

public static class BusinessDayCalculator
{
    private static readonly HttpClient HttpClient = new HttpClient();
    private static readonly Dictionary<(int year, string country), HashSet<DateTime>> HolidayCache = new();

    private const int DaysInYear = 252; // ACT/252 Convention
    
    public static async Task<DateTime> GetStrikeDateAsync(decimal maturity, string countryCode)
    {
        var startDate = DateTime.Today;
        int targetWorkingDays = (int)Math.Round(maturity * DaysInYear);

        var currentDate = startDate;
        int count = 0;

        while (count < targetWorkingDays)
        {
            currentDate = currentDate.AddDays(1);
            if (await IsWorkingDayAsync(currentDate, countryCode))
                count++;
        }

        return currentDate;
    }
    
    public static async Task<decimal> GetMaturityAsync(DateTime strikeDate, string countryCode)
    {
        var startDate = DateTime.Today;
        if (strikeDate < startDate)
            throw new ArgumentException("Strike date must be after today");

        int workingDays = await CountWorkingDaysAsync(startDate, strikeDate, countryCode);
        return Math.Round((decimal)workingDays / DaysInYear, 4, MidpointRounding.AwayFromZero);
    }
    
    public static async Task<int> CountWorkingDaysAsync(DateTime from, DateTime to, string countryCode)
    {
        int count = 0;
        for (var day = from; day <= to; day = day.AddDays(1))
        {
            if (await IsWorkingDayAsync(day, countryCode))
                count++;
        }
        return count;
    }

    private static async Task<bool> IsWorkingDayAsync(DateTime date, string countryCode)
    {
        if (date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday)
            return false;

        var holidays = await GetPublicHolidaysAsync(date.Year, countryCode);
        return !holidays.Contains(date.Date);
    }

    private static async Task<HashSet<DateTime>> GetPublicHolidaysAsync(int year, string countryCode)
    {
        if (HolidayCache.TryGetValue((year, countryCode), out var cached))
            return cached;

        var url = $"https://date.nager.at/api/v3/publicholidays/{year}/{countryCode}";
        using var response = await HttpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            throw new Exception($"Impossible de récupérer les jours fériés pour {year}. StatusCode: {response.StatusCode}, Content: {content}");
        }

        var jsonStream = await response.Content.ReadAsStreamAsync();
        var publicHolidays = await JsonSerializer.DeserializeAsync<PublicHoliday[]>(jsonStream,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        var holidays = new HashSet<DateTime>(
            publicHolidays?.Select(h => h.Date.Date) ?? Enumerable.Empty<DateTime>()
        );

        HolidayCache[(year, countryCode)] = holidays;
        return holidays;
    }
}

public class PublicHoliday
{
    public DateTime Date { get; set; }
    public string LocalName { get; set; }
    public string Name { get; set; }
    public string CountryCode { get; set; }
    public bool Fixed { get; set; }
    public bool Global { get; set; }
    public string[] Counties { get; set; }
    public int? LaunchYear { get; set; }
    public string Type { get; set; }
}
