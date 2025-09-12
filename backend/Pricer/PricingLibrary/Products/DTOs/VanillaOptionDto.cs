namespace PricingLibrary;

public record VanillaOptionDto(
    double S0, double  K, double T, double R, double Sigma, bool IsCall
) : IProductDto
{
    public IProduct ToDomain() =>
        new VanillaOption(S0, K, T, R, Sigma, IsCall);
}
