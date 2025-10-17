using Carter;

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
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();
builder.Services.AddCarter();

var app = builder.Build();

app.MapHealthChecks("/health");
app.UseCors("AllowFrontends");
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.MapCarter();


app.Run();
