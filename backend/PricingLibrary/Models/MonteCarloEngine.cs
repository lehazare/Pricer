using MathNet.Numerics.Distributions;
using MathNet.Numerics.Random;

namespace PricingLibrary;

public static class MonteCarloEngine
{
    private static double[,] SimulatePaths(
        IProduct? product,
        int nSamples,
        int nSteps,
        int seed = 42)
    {
        RandomSource rng = new MersenneTwister(seed);
        Normal normal = new Normal(0, 1, rng);
        double dt = product.Maturity / nSteps;
        double sqrtDt = Math.Sqrt(dt);

        double[,] s = new double[nSamples, nSteps + 1];
        
        for (int sample = 0; sample < nSamples; sample++)
        {
            s[sample, 0] = product.InitialPrice;
            
            for (int step = 1; step < nSteps + 1; step++)
            {
                double z = normal.Sample() ;
                double drift = (product.RiskFreeRate - product.Volatility * product.Volatility / 2) * dt;
                double diffusion = product.Volatility * sqrtDt * z; // W_(t+∆t) - W_(t) ≈ N(0, ∆t)
                s[sample, step] = s[sample, step - 1] * Math.Exp(drift +  diffusion); // St = S0 * exp[(r-vol^2/2)*t + vol*W_t]
            }            
        }

        return s;
    }
    
    public static double Run(
        IProduct? product,
        int nSamples,
        int nSteps,
        int seed = 42)
    {
        double[,] paths = SimulatePaths(product, nSamples, nSteps, seed);
        double sumPayoff = 0;
        
        for (int sample = 0; sample < nSamples; sample++)
        {
            double[] path = Enumerable.Range(0, nSteps + 1)
                .Select(j => paths[sample, j])
                .ToArray();
            sumPayoff += product.Payoff(path);
        }

        return sumPayoff / nSamples * Math.Exp(-product.RiskFreeRate * product.Maturity);
    }

}