---
layout: default
title: The Engine
nav_order: 2
has_children: false
permalink: /the-engine
---

# The Engine

The "Engine" behind btif consists of some loose Javascript code inside app.js (or app2.js, depending on when you read this). The main role of the engine is to handle navigation between scenes. Saving/loading, theming, etc. are handled by separate systems.

## Initialization and configuration

On startup, the engine takes some settings from `configuration.js`, most notably the `entryPoint` key which specifies which scene should be loaded first, and which theme should be used. The theme is displayed within the `target` element.

## Displaying scenes

The engine loads the scene files and displays them within the theme. Each theme must contain a `content` element, where the scene is displayed, along with its stylesheet and script file.

## Navigation

The engine adds a `click` event listener to the document. Every anchor tag is regarded as navigation link, i.e. to change scenes. Links with the `data-link` property are treated like regular links, and will navigate away.