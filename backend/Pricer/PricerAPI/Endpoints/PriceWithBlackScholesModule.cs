using System.Text.Json;
using Carter;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using PricingLibrary;

namespace PricerAPI.Endpoints;

public class PriceWithBlackScholesModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/PriceWithBlackScholes", ([FromBody] JsonElement optionDescriptor) =>
            {
                var result = (PriceGenericOption.PriceWithBlackScholes(optionDescriptor));
                return Results.Ok(result);
            })
            .WithName("PriceWithBlackScholes")
            .WithOpenApi(operation =>
            {
                if (operation.RequestBody != null &&
                    operation.RequestBody.Content.TryGetValue("application/json", out var mediaType))
                {
                    mediaType.Example = new OpenApiString("{\n  \"S0\": 100.0,\n  \"K\": 105.0,\n  \"T\": 1.0,\n  \"R\": 0.05,\n  \"Sigma\": 0.2,\n  \"IsCall\": true,\n  \"type\": \"vanilla\"\n}");
                }
                return operation;
            });    }
}