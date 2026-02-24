---
title: "C# Expressions in XAML: throw out your converters"
pubDate: 2026-02-24
slug: csharp-expressions-in-net-maui-xaml
image: "../../assets/headers/bin.webp"
tags: ["maui", "xaml", "dotnet"]
excerpt: "One of the most exciting XAML innovations in years is landing in .NET MAUI soonish: C# expressions right inside your XAML. String interpolation, boolean negation, inline calculations, so yes, you can finally throw out that InvertBoolConverter."
---

We've all been there. You need to show a label when something is *not* true, so you reach for your trusty `InvertedBoolConverter`. Then you need to display a formatted string, so you end up with a `{Binding Name, StringFormat='Hello, {0}!'}` or maybe even another converter if the display is a bit more complex. And let's not get started on multi-bindings with a custom converter just to multiply two numbers together.

Fortunately, those days are coming to an end. C# expressions in .NET MAUI XAML let you write actual C# expressions directly inside your markup. No converters, no multi-bindings, nothing. Let's take a look at what's possible.

## The prerequisite: XAML source generation

Before we dive in, there's one thing you need to enable. C# expressions build on top of the XAML compiler (also known as the MAUI XAML inflator), which compiles your XAML to C# at build time. To opt in, add the following to your `.csproj`:

```xml
<MauiXamlC>true</MauiXamlC>
<EnablePreviewFeatures>true</EnablePreviewFeatures>
```

Because this is still a preview feature, tooling support is not fully there yet. You might see squiggly underlines in Visual Studio that you can safely ignore. The app will still build and run just fine.

## Goodbye-nding?

The most immediately obvious change is how you write property bindings. Traditionally you would write something like this:

```xml
<Label Text="{Binding Name}" />
```

With C# expressions, you can drop the `Binding` keyword entirely and just reference the property by name:

```xml
<Label Text="{Name}" />
```

As long as your page or control has the correct `x:DataType` set pointing to your view model, XAML knows where to find `Name` and wires up the binding automatically. This makes the page more readable, even if it is probably going to take some getting used to.

## String interpolation, the way it should be

Ever had to write something like this?

```xml
<Label Text="{Binding Name, StringFormat='Hello, {0}! Welcome back.'}" />
```

The single quotes, the `{0}` placeholder, it's not great. With C# expressions, you get proper string interpolation using the dollar sign syntax you already know from C#:

```xml
<Label Text="{$'Hello, {Name}!'}" />
```

Note that the outer quotes are single quotes (since double quotes are already taken by the XML attribute), but everything inside works just like `$"..."` would in C#. You can interpolate as many values as you like, mix in other expressions, without the need for any converter or other piece of magic glue to make it happen.

## Inline calculations

Need to display the total price in a cart? Previously you'd either create a backing property in your view model that multiplied `Price` and `Quantity`, or you'd wrangle a multi-binding with a converter. Now you can just do the math inline:

```xml
<Label Text="{$'Total: ${Price * Quantity:F2}'}" />
```

Format specifiers work too, so something like `:F2` will keep your value to two decimal places. Your view model stays lean and your XAML stays readable.

## Boolean negation without a converter

This one looks so minimal, but saves such an amount of plumbing in apps. We all have that `InvertedBoolConverter` sitting somewhere in our project. Sometimes it comes from the .NET MAUI Community Toolkit, sometimes it's been copied between projects over the years and nobody really knows where it came from. Either way, you can delete it now:

```xml
<!-- Old way -->
<Label IsVisible="{Binding IsHidden, Converter={StaticResource InvertBoolConverter}}" />

<!-- New way -->
<Label IsVisible="{!IsHidden}" />
```

That's it. As simple as adding an exclamation mark.

## Boolean expressions

Beyond negation, you can also combine boolean properties into expressions. Want to enable a button only when the user has an account *and* has agreed to the terms?

```xml
<Button IsEnabled="HasAccount &amp;&amp; AgreeToTerms" />
```

The `&amp;&amp;` is unfortunately required because XAML is XML and the ampersand character has special meaning there. It's not the prettiest, but it's a lot better than setting up a multi-binding with a converter just to perform an AND check. There's also talk of supporting keywords like `and` as an alternative, which would clean this up further.

## Lambda event handlers

C# expressions also extend to event handlers. Instead of pointing to a method name, you can write an inline lambda:

```xml
<!-- Old way -->
<Button Clicked="OnButtonClicked" Text="Click me" />

<!-- New way -->
<Button Clicked="{(s, e) => ViewModel.ClickCount++}" Text="Click me" />
```

For simple one-liners this is a nice convenience. For anything more complex, you'll probably still want a named method in your code-behind. For me, this simple increment lambda already looks a bit icky, so I probably won't be using this feature as much. From a testability perspective this is probably also better done in a method somewhere that gets tested. However, for quick interactions it removes the need to jump around the file just to find a method that increments a counter.

## When is this available?

This feature was originally targeted for .NET 11, but it has already been merged into .NET 10, which is great news. At the time of writing it's available behind the `EnablePreviewFeatures` flag, and the expectation is that it will ship as a stable feature in a .NET 10 service release somewhere down the line. So you can start experimenting with it right now!

Now go delete that `InvertedBoolConverter`. You've earned it.
