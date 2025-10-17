using Carter;
using SchedulingLibrary;

namespace SchedulingAPI.Endpoints;

public class StrikeDateModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/strikeDate", async (decimal maturity, string countryCode) =>
            {
                return await BusinessDayCalculator.GetStrikeDateAsync(maturity, countryCode);
            })
            .WithName("GetStrikeDate")
            .WithOpenApi(operation =>
            {
                foreach (var param in operation.Parameters)
                {
                    if (param.Name == "maturity") param.Example = new Microsoft.OpenApi.Any.OpenApiDouble(1);
                    if (param.Name == "countryCode") param.Example = new Microsoft.OpenApi.Any.OpenApiString("FR");
                }
                return operation;
            });    }
}