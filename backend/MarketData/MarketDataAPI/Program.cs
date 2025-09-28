using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontends", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://leolazare.netlify.app/"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddHealthChecks();

var app = builder.Build();

app.MapHealthChecks("/health");

app.UseCors("AllowFrontends");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

HttpClient httpClient = new HttpClient();
httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36");

app.MapGet("/price/{symbol}", async (string symbol) =>
{
    string url = $"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d";

    try
    {
        var response = await httpClient.GetStringAsync(url);
        using var doc = JsonDocument.Parse(response);

        var root = doc.RootElement;

        var price = root
            .GetProperty("chart")
            .GetProperty("result")[0]
            .GetProperty("meta")
            .GetProperty("regularMarketPrice")
            .GetDecimal();

        return Results.Ok(new { Symbol = symbol, SpotPrice = price });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error while fetching : {ex.Message}");
    }
});

app.Run();