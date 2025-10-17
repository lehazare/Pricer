namespace PricingLibrary;

public interface IProduct
{
    double InitialPrice { get; }       
    double Maturity { get; }          
    double RiskFreeRate { get; }      
    double Volatility { get; }       
    double Payoff(double[] path);      
}