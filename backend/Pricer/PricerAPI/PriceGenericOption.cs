using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
namespace PricingLibrary;

public class PriceGenericOption
{
    public static IResult PriceWithMonteCarlo([FromBody] JsonElement raw)
    {
        string? type = raw.GetProperty("type").GetString();
    
        IProductDto? dto = type switch
        {
            "vanilla" => raw.Deserialize<VanillaOptionDto>(),
            "asian" => raw.Deserialize<AsianOptionDto>(),
            "autocall" => raw.Deserialize<AutocallDto>(),
            _ => throw new NotSupportedException("Unknown type")
        };

        var option = dto?.ToDomain();
        double price = MonteCarloEngine.Run(option, nSamples: 100000, nSteps: 100);

        return Results.Ok(new { Price = Math.Round(price, 2, MidpointRounding.AwayFromZero)});
    }
}