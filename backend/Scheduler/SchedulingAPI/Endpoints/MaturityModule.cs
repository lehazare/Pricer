using Carter;
using SchedulingLibrary;

namespace SchedulingAPI.Endpoints;

public class MaturityModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/maturity", async (DateTime strikeDate, string countryCode) =>
            {
                return await BusinessDayCalculator.GetMaturityAsync(strikeDate, countryCode);
            })
            .WithName("GetMaturity")
            .WithOpenApi(operation =>
            {
                foreach (var param in operation.Parameters)
                {
                    if (param.Name == "strikeDate") param.Example = new Microsoft.OpenApi.Any.OpenApiString(DateTime.Today.AddYears(1).ToString("yyyy-MM-dd"));
                    if (param.Name == "countryCode") param.Example = new Microsoft.OpenApi.Any.OpenApiString("FR");
                }
                return operation;
            });    }
}