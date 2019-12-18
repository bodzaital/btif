---
layout: default
title: Directories
parent: The Engine
nav_order: 2
permalink: /the-engine/directories
---

# Directories

## Structure

```
src\
  ├─modules\
  │   ├─file.js
  │   ├─globals.js
  │   └─utils.js
  ├─scenes\
  │   └─ ...
  ├─themes\
  │   └─ ...
  ├─app.js
  ├─configuration.js
  └─index.html
```

## modules\

The `modules` directory contains subsystems of the engine, like the File API, the game data store, and utility methods.

## scenes\

The `scenes` directory contains the scenes in the following structure:

```
scenes\
  ├─scene-0\
  │   ├─scene-0.css
  │   ├─scene-0.html
  │   └─scene-0.js
  ├─scene-1\
  │   ├─scene-1.css
  │   ├─scene-1.html
  │   └─scene-1.js
  ├─ ...
```

All scenes must have a `.css`, `.html` and `.js` file with the same name as the parent directory.

## themes\

The `themes` directory contains the available themes in the following structure:

```
themes\
  ├─deftheme\
  │   ├─frame.css
  │   ├─frame.html
  │   └─frame.js
  ├─theme-name\
  │   ├─frame.css
  │   ├─frame.html
  │   └─frame.js
  ├─ ...
```

All scenes must have a `frame.css`, `frame.html` and `frame.js` file.

## app.js

The main engine file. Contains the logic behind scene changes.

## configuration.js

Configuration file. Has the following keys:

- `entryPoint`: The name of the scene that's the first scene.
- `title`: The name of the project, displayed in the title bar.
- `theme`: The name of the theme to use.

## index.html

The main file that's displayed to the player.