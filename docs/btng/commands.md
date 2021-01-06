---
layout: default
title: BTNG Commands
parent: BTNG
nav_order: 2
permalink: /btng/commands
---

# BTNG Commands

## Project

These commands should be run from the same directory the project directory is in. In a later version, these will be run from within the project directory.

### new

Generates a new project. Won't overwrite existing projects.

```
--project new [project name]
```

### delete

Deletes a project if it exists. Won't ask twice.

```
--project delete [project name]
```

### update

Updates the files of the project, including the engine (app.js), the default theme, and the Javascript modules. The configuration and the scenes folder is not updated.

```
--project update [project name]
```

## Scene

These commands should be run from the project directory.

### list

Lists the scenes in the current project.

```
--scene
```

### new

Creates a new scene. Won't overwrite existing scenes.

```
--scene new [scene name]
```

### delete

Deletes a scene. Won't ask twice.

```
--scene delete [scene name]
```