using MathNet.Numerics.Distributions;

namespace PricingLibrary;

public class BlackScholesEngine
{
    private static double Cnd(double x)
    {
        return Normal.CDF(0.0, 1.0, x);
    }
    
    public static double Run(VanillaOption? input)
    {
        double d1 = (Math.Log(input.InitialPrice / input.Strike) + (input.RiskFreeRate + 0.5 * input.Volatility * input.Volatility) * input.Maturity)
                    / (input.Volatility * Math.Sqrt(input.Maturity));
        double d2 = d1 - input.Volatility * Math.Sqrt(input.Maturity);

        return input.IsCall ? input.InitialPrice * Cnd(d1) - input.Strike * Math.Exp(-input.RiskFreeRate * input.Maturity) * Cnd(d2) : input.Strike * Math.Exp(-input.RiskFreeRate * input.Maturity) * Cnd(-d2) - input.InitialPrice * Cnd(-d1);
    }
    
}