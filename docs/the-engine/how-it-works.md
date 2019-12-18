---
layout: default
title: How it works
parent: The Engine
nav_order: 2
permalink: /the-engine/how-it-works
---

# How it works

## Initialization and configuration

On startup, the engine takes some settings from `configuration.js`, most notably the `entryPoint` key which specifies which scene should be loaded first, and which theme should be used. The theme is displayed within the `target` element.

## Displaying scenes

The engine loads the scene files and displays them within the theme. Each theme must contain a `content` element, where the scene is displayed, along with its stylesheet and script file.

## Navigation

The engine adds a `click` event listener to the document. Every anchor tag is regarded as navigation link, i.e. to change scenes. Links with the `data-link` property are treated like regular links, and will navigate away.

## Saving/Loading

The engine keeps track of the current scene, and saves it alongside the game data store. On loading, the engine will change to the saved "current" scene, but setting up the data inside the scenes must be handled by the scenes themelves (see: [File API/Saving API](/btif/file-api/saving)).