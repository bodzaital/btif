# btif

This is a framework to create interactive fiction. The idea is based on Twine 2, but with the aim to write raw Html, Css, and Js code instead of working within the IDE.

## How to use

1. Have a scene-0.html. This is the entry point to the story. Other scenes may have other names.
2. Add hyperlinks to change scenes like so: `<a href="scene-1">Go to work</a>` (href is *without* .html) will link to scene-1.html.

The main `app.js` will handle scene changes. As this uses AJAX calls, you need a webserver to launch the story.

`vals.js` handles global variables. Usage would be the following:

- in `vals.js`, add `var player = ""` for the player's name
- for example in scene-0.html, have an `input` field with `id="name"` and add a `script` tag linking to `scene-0.js`
- in `scene-0.js`, add an event handler for clicking on links, and save the input field value to the `player` variable
- use this `player` variable in scene-1.html

## Roadmap

- Be able to define any scene as the entry point in `app.js`
- Implement Mediawiki styled short linking. This has proven challenging.
- Implement Markdown editing and parsing.
- Package as an Electron app.