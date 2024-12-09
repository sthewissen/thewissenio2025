---
title: Another set of free Syncfusion controls!
pubDate: 2024-12-09
slug: free-syncfusion-for-net-maui-controls
image: 
   url: '/images/headers/sheets.jpg'
   description: 'Dirty sheets, or just bottom sheets'
tags: ["maui"]
excerpt: As developers, we’re always on the lookout for tools that make our lives easier, streamline our workflows, and, let’s face it, cut down the time we spend banging our heads on the keyboard.
---

A while ago, Syncfusion generously dropped [a first set of open-source .NET MAUI controls](https://help.syncfusion.com/maui-toolkit/introduction/overview) into the world. This set of controls was augmented by the news that Microsoft has welcomed contributions to the .NET MAUI ecosystem from Syncfusion. While the first set didn't necessarily spark much excitement in me personally (a lot of the functionality on offer is already covered by .NET MAUI itself), the second set they released did peak my interest.

This new batch brings some fresh gems, but my personal favorite? The **BottomSheet** control. Now, if you’re not familiar with what a BottomSheet really is; it’s that magical UI element that slides up from the bottom of the screen. Typically it offers additional options, details, or occasionally a mini existential crisis over which kind of Uber you want to order.

![The Uber app makes heavy use of bottom sheets.](/images/posts/uber-app.jpg)
*The Uber app makes heavy use of bottom sheets.*

Implementing it is surprisingly straightforward, even if your past attempts at UI finesse often end in chaos. Compared to some of the other solutions I've tried that are out there in the community, this one feels a bit easier to handle. You just add it to your layout, tweak a few properties, and it works like a charm. 

```xml
<bottomSheet:SfBottomSheet x:Name="bottomSheet">
  <bottomSheet:SfBottomSheet.Content>
    <VerticalStackLayout Padding="20">
      <!-- This is your main content container -->
      <Button Text="Open Bottom Sheet" Clicked="OpenBottomSheet" VerticalOptions="Center" />
    </VerticalStackLayout>
  </bottomSheet:SfBottomSheet.Content>
  <bottomSheet:SfBottomSheet.BottomSheetContent>
    <!-- This is your bottom sheet content container -->
    <Label Text="Hi From The Bottom Sheet" VerticalOptions="Center" HorizontalOptions="Center" />
  </bottomSheet:SfBottomSheet.BottomSheetContent>
</bottomSheet:SfBottomSheet>
```
## And there's more!

The `BottomSheet` isn't the only control that was added. Other notable ones are a very versatile **Button** control, a **Calendar**, and various additions to an otherwise dull and boring text entry. And because it’s all open source, you can peek under the hood and even contribute if you’re feeling adventurous.