using Carter;
using SchedulingLibrary;

namespace SchedulingAPI.Endpoints;

public class WorkingDaysModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/numberOfWorkingDays", async (DateTime from, DateTime to, string countryCode) =>
            {
                return await BusinessDayCalculator.CountWorkingDaysAsync(from, to, countryCode);
            })
            .WithName("GetWorkingDays")
            .WithOpenApi(operation =>
            {
                foreach (var param in operation.Parameters)
                {
                    if (param.Name == "from") param.Example = new Microsoft.OpenApi.Any.OpenApiString(DateTime.Today.ToString("yyyy-MM-dd"));
                    if (param.Name == "to") param.Example = new Microsoft.OpenApi.Any.OpenApiString(DateTime.Today.AddDays(365).ToString("yyyy-MM-dd"));
                    if (param.Name == "countryCode") param.Example = new Microsoft.OpenApi.Any.OpenApiString("FR");
                }
                return operation;
            });    }
}