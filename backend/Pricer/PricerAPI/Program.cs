using Carter;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCarter();
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
app.MapCarter();
app.MapHealthChecks("/health");
app.UseHttpsRedirection();

app.Run();