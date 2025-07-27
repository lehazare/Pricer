using PricingLibrary;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/PriceWithBlackScholes", BlackScholesEngine.CalculateVanillaPrice)
    .WithName("PriceWithBlackScholes")
    .WithOpenApi();

app.MapPost("/PriceWithMonteCarlo", PriceGenericOption.PriceWithMonteCarlo)
    .WithName("GetPriceWithMonteCarlo")
    .WithOpenApi();

app.Run();