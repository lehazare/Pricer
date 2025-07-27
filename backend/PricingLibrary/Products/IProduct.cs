namespace PricingLibrary;

public interface IProduct
{
    double InitialPrice { get; }        // S₀
    double Maturity { get; }            // T
    double RiskFreeRate { get; }        // r
    double Volatility { get; }          // σ
    double Payoff(double[] path);       // path: the full trajectory (St[0..T])
}