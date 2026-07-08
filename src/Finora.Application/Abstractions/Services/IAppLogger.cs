using System;
using System.Collections.Generic;
using System.Text;

namespace Finora.Application.Abstractions.Services;

public interface IAppLogger {
    ValueTask Info(string message);
    ValueTask Warn(string message);
    ValueTask Error(string message);
    ValueTask Debug(string message);
}
