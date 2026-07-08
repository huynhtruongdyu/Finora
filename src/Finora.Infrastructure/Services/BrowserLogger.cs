using Finora.Application.Abstractions.Services;

using Microsoft.JSInterop;

namespace Finora.Infrastructure.Services;

internal class BrowserLogger(IJSRuntime jsRuntime) : IAppLogger {
    public async ValueTask Debug(string message) {
        await jsRuntime.InvokeVoidAsync("console.debug", message);
    }

    public async ValueTask Error(string message) {
        await jsRuntime.InvokeVoidAsync("console.error", message);
    }

    public async ValueTask Info(string message) {
        await jsRuntime.InvokeVoidAsync("console.info", message);
    }

    public async ValueTask Warn(string message) {
        await jsRuntime.InvokeVoidAsync("console.warn", message);
    }
}
