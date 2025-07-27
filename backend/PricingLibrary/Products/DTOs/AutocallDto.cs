namespace PricingLibrary;

public record AutocallDto(
    double S0, double T, double R, double Sigma, double Nominal, double Barrier, double[] Coupon, double ProtectionLevel
) : IProductDto
{
    public IProduct ToDomain() =>
        new Autocall(S0, T, R, Sigma, Nominal, Barrier, Coupon, ProtectionLevel);
}
