using Microsoft.Extensions.DependencyInjection;

namespace Finora.Application;

public static class DependencyInjections {
    public static IServiceCollection AddApplication(this IServiceCollection services) {
        // Register application services here
        return services;
    }
}
