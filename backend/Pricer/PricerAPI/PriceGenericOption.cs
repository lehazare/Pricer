using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
namespace PricingLibrary;

public class PriceGenericOption
{
    public static IResult PriceWithMonteCarlo([FromBody] JsonElement optionDescriptor)
    {
        string? type = optionDescriptor.GetProperty("type").GetString();
    
        IProductDto? dto = type switch
        {
            "vanilla" => optionDescriptor.Deserialize<VanillaOptionDto>(),
            "asian" => optionDescriptor.Deserialize<AsianOptionDto>(),
            "autocall" => optionDescriptor.Deserialize<AutocallDto>(),
            _ => throw new NotSupportedException("Unknown type")
        };

        var option = dto?.ToDomain();
        double price = MonteCarloEngine.Run(option, nSamples: 100000, nSteps: 100);

        return Results.Ok(new { Price = Math.Round(price, 2, MidpointRounding.AwayFromZero)});
    }
    
    public static IResult PriceWithBlackScholes([FromBody] JsonElement optionDescriptor)
    {
        string? type = optionDescriptor.GetProperty("type").GetString();
        
         VanillaOptionDto? dto = type switch
        {
            "vanilla" => optionDescriptor.Deserialize<VanillaOptionDto>(),
            _ => throw new NotSupportedException("Impossible to price a non-Vanilla Option with Black & Scholes")
        };

        VanillaOption? option = (VanillaOption)dto?.ToDomain()!;
        double price = BlackScholesEngine.Run(option);

        return Results.Ok(new { Price = Math.Round(price, 2, MidpointRounding.AwayFromZero)});
    }
    
}