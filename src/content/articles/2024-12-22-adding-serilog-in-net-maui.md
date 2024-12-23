---
title: Adding Serilog to .NET MAUI
pubDate: 2024-12-22
slug: adding-serilog-to-net-maui
image: '../../assets/headers/logs.webp'
tags: ["maui"]
excerpt: "Logging is an essential part of any application. It's how your app tells you what just exploded. In this post, we'll explore how to integrate Serilog, a flexible and powerful logging library, into a .NET MAUI app."
---

When building apps with .NET MAUI, logging plays a crucial part in troubleshooting and understanding your application's behavior. While centralized logging tools like Sentry are great for aggregate insights, having app-specific logs stored locally on the device can sometimes be a lifesaver for debugging issues that only appear in specific environments or more unique scenarios. Serilog, one of the more popular logging frameworks, is a great choice for implementing this in .NET MAUI. Let's take a look at how easy it is to set up Serilog in a MAUI app and highlight some key configurations for local logging.

## Installing the required packages

To get started we need to bring in the appropriate NuGet packages. Open your solution and pop open the NuGet Package Manager. Search for and install `Serilog`, `Serilog.Extensions.Hosting` and `Serilog.Sinks.File`. The `Serilog.Extensions.Hosting` package allows for seamless integration with the `MauiAppBuilder` pipeline, while `Serilog.Sinks.File` enables local storage of log files on the device. These packages will set the foundation for capturing and storing log information effectively.

```bash
dotnet add package Serilog  
dotnet add package Serilog.Extensions.Hosting  
dotnet add package Serilog.Sinks.File
```

In Serilog, a sink is where your logs go to live their best lives. You can use multiple sinks simultaneously, which is handy when you want local logs for debugging and centralized logs for analysis. There are options to log to a local Sqlite database, Application Insights and a [plethora of other options](https://www.nuget.org/packages?q=serilog.sinks) (some of which are community-driven).

## Registering our dependencies

To use Serilog in your .NET MAUI app, you’ll need to configure it during app startup. This involves registering Serilog with the app’s dependency injection system. Open your `MauiProgram.cs` file and add the Serilog setup in the `CreateMauiApp` method.

```csharp
using Serilog;

public static MauiApp CreateMauiApp()
{
    var builder = MauiApp.CreateBuilder();
    builder
        .UseMauiApp<App>();

    builder.Services.AddSerilog(
        new LoggerConfiguration()
            .WriteTo.File(Path.Combine(FileSystem.Current.AppDataDirectory, "log.txt"))
            .CreateLogger()
    );

    return builder.Build();
}
```

This setup initializes Serilog and hooks it into the app lifecycle. Now, your logs have a home and won’t go wandering off. This also ensures that Serilog is registered as the default implementation of the `ILogger` interface from `Microsoft.Extensions.Logging`. This means any service or component in your app that depends on `ILogger` will automatically use Serilog for logging.

```csharp
using Microsoft.Extensions.Logging;

public class ComplexOperationsForYa
{
    private readonly ILogger<ComplexOperationsForYa> _logger;

    public SampleService(ILogger<ComplexOperationsForYa> logger)
    {
        _logger = logger;
    }

    public void DoTheThing()
    {
        _logger.LogInformation("I did the thing!");
        
        try
        {
            // Simulate an operation
            throw new InvalidOperationException("Such bad, much error.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "This is not good.");
        }
    }
}
```

Providing a generic type, like `ILogger<ComplexOperationsForYa>`, is important because it ties log messages to the context of the class where they originate. This adds clarity to logs by including the class name in the log output, which is particularly helpful in large applications. Without providing a type, dependency injection will also simply fail and stare at you blankly, like it’s waiting for a bus that’s never coming.

## What else is in the box?
Serilog’s file sink offers several powerful options for customizing how logs are written. For example, you can include log file rotation to keep things neat and tidy. This rotates the log daily, preventing your app from ending up with one giant, unwieldy log file. You can also limit file size and keep a set number of old log files:

```csharp
public static MauiApp CreateMauiApp()
{
    var builder = MauiApp.CreateBuilder();
    builder
        .UseMauiApp<App>();

    builder.Services.AddSerilog(
        new LoggerConfiguration()
            .WriteTo.File(Path.Combine(FileSystem.Current.AppDataDirectory, "log.txt"),
                rollingInterval: RollingInterval.Day,
                fileSizeLimitBytes: 10000000,
                retainedFileCountLimit: 7)
            .CreateLogger()
    );

    return builder.Build();
}
```

This will create a file size cap (10MB) and store up to 7 log files before older ones are going to get discarded. There’s a lot to explore here, but these options give you the basics. The amount of sinks out there is quite sizeable, so there will surely be an option out there that works for your scenario. And if not? Just roll your own and share it with the world!