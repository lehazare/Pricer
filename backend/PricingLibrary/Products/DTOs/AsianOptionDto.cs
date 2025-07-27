namespace PricingLibrary;

public record AsianOptionDto(
    double S0, double  K, double T, double R, double Sigma, bool IsCall
) : IProductDto
{
    public IProduct ToDomain() =>
        new AsianOption(S0, K, T, R, Sigma, IsCall);
}