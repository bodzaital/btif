# btif

This is a framework to create interactive fiction. The idea is based on Twine 2, but with the aim to write raw Html, Css, and Js code instead of working within the IDE.

## How to use

Every page in the story is a scene, and each scene is in its own directory under `scenes`. A scene must have an `.html` file. This is a partial Html file without headers or `<body>` tags. A scene may have a `<meta >` tag with id `sceneData`. Currently, there is only one attribute, `data-title` which changes the scene's title as seen in the title bar.

A scene could also have a script file and style sheet, both with with the same name as the scene itself (e.g. `scene-0` should have a `scene-0.html` and optionally a `scene-0.js` and `scene-0.css`).

```
scenes
 ├─scene-0
 │  ├─scene-0.html
 │  ├─scene-0.js
 │  └─scene-0.css
 └─scene-1
    ├─scene-1.html
    ├─scene-1.js
    └─scene-1.css
```

The main entry point to the story is defined in `configuration.js`. There, some other settings could be changed like the fade duration, the main title of the story, or enabling or disabling debug mode.

To link to another scene, use an `<a>` tag, but omit the file extension. A link to `scene-1` would look like this: `<a href ="scene-1">Go to scene 1</a>`.

The backbone of the framework is `app.js`. The latest version of Firefox runs the AJAX calls, but Chrome doesn't, so you'd need a web server to launch the story.

## Todo

- Continually add configuration options.
- A cli scaffolder that can create the scene directory structure.