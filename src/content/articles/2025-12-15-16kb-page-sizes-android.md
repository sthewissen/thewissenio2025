---
title: Supporting Android 16KB page sizes
pubDate: 2025-12-15
slug: 16kb-page-sizes-android
image: '../../assets/headers/pagesize.webp'
tags: ["maui","android"]
excerpt: "Android 15 apps need 16 KB page size support, and my app definitely didn't have it. So let's take a quick peek at what needs to be done to support it."
---

So there I was, minding my own business, pushing a routine update to the Google Play Store for one of my .NET MAUI apps. Our CI pipeline was building the update for us, so I grabbed a coffee, and waited. Instead of a bunch of green checkmarks however, there was a little red error that popped up.

## What's happening here?
The notification was pretty straightforward: "Your latest production release does not support 16 KB memory page sizes." Apparently, starting November 1st, 2025, Google decided that all apps targeting Android 15 and up need to support 16 KB page sizes on 64-bit devices. They actually announced this back in May, but I totally missed the memo.

## What does it actually mean?
What it means is that Android is moving from 4 KB to 16 KB memory page sizes. Basically, that's an improvement that's all about performance optimization for devices with more RAM. Google threw some impressive numbers at us, probably a bit inflated when compared to your own case:

- App launch times improved by around 3% on average (some apps saw up to 30% improvement, probably not yours though ;))
- App launch power consumption improved by 4.5%
- Overall system performance got better

Obviously, who wouldn't want all that, right? Luckily, it's fairly easy to get started with all of this.

## What do I do?
The good news is that .NET MAUI 9 supports 16 KB page sizes right out of the box. No special configuration, no weird workarounds, just upgrade and you're golden. At least in theory. Your app is not the only one that needs to support this, because all of your dependencies should to. This is where it could become a bit tricky, given that not everyone will be up-to-date with their packages. I mean, I had missed it myself since May, so it wouldn't amaze me if some packages aren't up to speed either. 

If you're still on a version lower than .NET 9 you would be wise to start upgrading anyway, given the additional improvements in later .NET MAUI versions. The newest version for .NET 10 is out and comes with a bunch of additional improvements worth checking out. So, what are you waiting for? Get to upgrading!