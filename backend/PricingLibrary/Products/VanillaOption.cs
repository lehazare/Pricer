namespace PricingLibrary;

public class VanillaOption(double s0, double strike, double t, double r, double sigma, bool isCall)
    : IProduct
{
    public double InitialPrice { get; } = s0;
    public double Maturity { get; } = t;
    public double RiskFreeRate { get; } = r;
    public double Volatility { get; } = sigma;
    public double Strike { get; } = strike;
    public bool IsCall { get; } = isCall;

    public double Payoff(double[] path)
    {
        double st = path[^1];
        return IsCall ? Math.Max(st - Strike, 0) : Math.Max(Strike - st, 0);
    }
}