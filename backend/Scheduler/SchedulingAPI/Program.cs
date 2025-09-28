using SchedulingAPI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontends", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://leolazare.netlify.app/"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSwaggerGen();

builder.Services.AddHealthChecks();

var app = builder.Build();

app.MapHealthChecks("/health");

app.UseCors("AllowFrontends");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/numberOfWorkingDays", async (DateTime from, DateTime to, string countryCode) =>
    {
        return await BusinessDayCalculator.CountWorkingDaysAsync(from, to, countryCode);
    })
    .WithName("GetWorkingDays")
    .WithOpenApi(operation =>
    {
        foreach (var param in operation.Parameters)
        {
            if (param.Name == "from") param.Example = new Microsoft.OpenApi.Any.OpenApiString(DateTime.Today.ToString("yyyy-MM-dd"));
            if (param.Name == "to") param.Example = new Microsoft.OpenApi.Any.OpenApiString(DateTime.Today.AddDays(365).ToString("yyyy-MM-dd"));
            if (param.Name == "countryCode") param.Example = new Microsoft.OpenApi.Any.OpenApiString("FR");
        }
        return operation;
    });

app.MapGet("/strikeDate", async (decimal maturity, string countryCode) =>
    {
        return await BusinessDayCalculator.GetStrikeDateAsync(maturity, countryCode);
    })
    .WithName("GetStrikeDate")
    .WithOpenApi(operation =>
    {
        foreach (var param in operation.Parameters)
        {
            if (param.Name == "maturity") param.Example = new Microsoft.OpenApi.Any.OpenApiDouble(1);
            if (param.Name == "countryCode") param.Example = new Microsoft.OpenApi.Any.OpenApiString("FR");
        }
        return operation;
    });

app.MapGet("/maturity", async (DateTime strikeDate, string countryCode) =>
    {
        return await BusinessDayCalculator.GetMaturityAsync(strikeDate, countryCode);
    })
    .WithName("GetMaturity")
    .WithOpenApi(operation =>
    {
        foreach (var param in operation.Parameters)
        {
            if (param.Name == "strikeDate") param.Example = new Microsoft.OpenApi.Any.OpenApiString(DateTime.Today.AddYears(1).ToString("yyyy-MM-dd"));
            if (param.Name == "countryCode") param.Example = new Microsoft.OpenApi.Any.OpenApiString("FR");
        }
        return operation;
    });



app.Run();
