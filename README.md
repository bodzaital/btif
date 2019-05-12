# btif

This is a framework to create interactive fiction. The idea is based on Twine 2, but with the aim to write raw Html, Css, and Js code instead of working within the IDE.

## How to use

Every page in the story is a scene, and each scene is in its own directory under `scenes`. A scene must have an `.html` file. This is a partial Html file without headers or `<body>` tags. A scene may have a `<meta>` tag with id `sceneData`. Currently, there is only one attribute, `data-title`, which changes the scene's title as seen in the title bar.

A scene could also have a script file and style sheet, both with with the same name as the scene itself (e.g. `scene-0` should have a `scene-0.html` and optionally a `scene-0.js` and `scene-0.css`). Each scene script operates within their scene, on navigation their data is discarded. To save player information between scenes, create an entry in the `globals` object in `globals.js` (within `scenes/data/`) and save it there.

A theme can implement saving/loading using framework functions.

The framework has a jQuery-like shorthand for selecting DOM elements:
```js
/**
 * Wrapper for document.querySelector().
 * @param {string} s CSS selector for the DOM object.
 */
function x(s) {
    return document.querySelector(s);
}
```
`x` was used as to not clash with jQuery even though it is not required for the framework.

The main entry point to the story is defined in `configuration.js`. There, some other settings could be changed like the main title of the story, or a theme.

To link to another scene, use an `<a>` tag, but omit the file extension. A link to `scene-1` would look like this: `<a href="scene-1" data-link>Go to scene 1</a>`. Only links with the `data-link` attribute are considered for scene changing because other functionality (popups) may be triggered with links.

The backbone of the framework is `app.js` which runs the AJAX calls. The latest version of Firefox allows them, but Chrome doesn't without a web server.