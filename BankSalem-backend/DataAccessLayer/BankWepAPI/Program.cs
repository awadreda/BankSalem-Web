using System.Security.Cryptography.X509Certificates;

namespace BankWepAPI;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder
                    .AllowAnyOrigin() // Allow requests from any origin
                    .AllowAnyMethod() // Allow all HTTP methods
                    .AllowAnyHeader(); // Allow all headers
            });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (builder.Configuration.GetValue<bool>("EnableSwagger"))
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bank API V1");
                c.RoutePrefix = "swagger"; // Access via /swagger
            });
        }

        // app.UseHttpsRedirection();
        app.UseCors();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
