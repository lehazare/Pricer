namespace PricingLibrary;

public class Autocall(double s0, double t, double r, double sigma, double nominal, double barrier, double[] coupon, double protectionLevel)
    : IProduct
{
    public double InitialPrice { get; } = s0;
    public double Maturity { get; } = t;
    public double RiskFreeRate { get; } = r;
    public double Volatility { get; } = sigma;
    public double Nominal { get; } = nominal;
    public double Barrier { get; } = barrier;
    public double[] Coupon { get; } = coupon;
    public double ProtectionLevel { get; } = protectionLevel;

    public double Payoff(double[] path)
    {
        double coupons = 0;
        int nbCoupons = Coupon.Length;
        for (int i = 0; i < nbCoupons; i++)
        {
            coupons += Coupon[i];
            if (path[(int)(i * Maturity / nbCoupons)] >= Barrier)
            {
                return Nominal + coupons;
            }
        }
        
        double ST = path[^1];
        if (ST >= ProtectionLevel * InitialPrice)
        {
            return Nominal;
        }
        else
        {
            return Nominal * ST / InitialPrice; 
        }
    }
}