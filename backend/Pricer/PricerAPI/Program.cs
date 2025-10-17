using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using PricingLibrary;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontends", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://leolazare.netlify.app",
                "https://leolazare.fr"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseCors("AllowFrontends");

app.UseSwagger();
app.UseSwaggerUI();

app.MapHealthChecks("/health");

app.UseHttpsRedirection();

app.MapPost("/PriceWithBlackScholes", ([FromBody] JsonElement optionDescriptor) => (PriceGenericOption.PriceWithBlackScholes(optionDescriptor)))
    .WithName("PriceWithBlackScholes")
    .WithOpenApi(operation =>
    {
        if (operation.RequestBody != null &&
            operation.RequestBody.Content.TryGetValue("application/json", out var mediaType))
        {
            mediaType.Example = new OpenApiString("{\n  \"S0\": 100.0,\n  \"K\": 105.0,\n  \"T\": 1.0,\n  \"R\": 0.05,\n  \"Sigma\": 0.2,\n  \"IsCall\": true,\n  \"type\": \"vanilla\"\n}");
        }
        return operation;
    });

app.MapPost("/PriceWithMonteCarlo", ([FromBody] JsonElement optionDescriptor) =>
    {
        var result = PriceGenericOption.PriceWithMonteCarlo(optionDescriptor);
        return Results.Ok(result);
    })
    .WithName("GetPriceWithMonteCarlo")
    .WithOpenApi(operation =>
    {
        if (operation.RequestBody != null &&
            operation.RequestBody.Content.TryGetValue("application/json", out var mediaType))
        {
            mediaType.Example = new OpenApiString("{\n  \"S0\": 100.0,\n  \"K\": 105.0,\n  \"T\": 1.0,\n  \"R\": 0.05,\n  \"Sigma\": 0.2,\n  \"IsCall\": true,\n  \"type\": \"vanilla\"\n}");
        }
        return operation;
    });

app.Run();