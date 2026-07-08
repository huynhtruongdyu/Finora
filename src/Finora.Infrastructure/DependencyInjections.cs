using Finora.Application.Abstractions.Services;
using Finora.Infrastructure.Services;

using Microsoft.Extensions.DependencyInjection;

namespace Finora.Infrastructure;

public static class DependencyInjections {
    public static IServiceCollection AddInfrastructure(this IServiceCollection services) {
        // Register infrastructure services here
        services.AddSingleton<IAppLogger, BrowserLogger>();
        return services;
    }
}
