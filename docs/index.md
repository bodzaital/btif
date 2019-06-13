# Home

btif is a work-in-progress interactive fiction player. The main design goal is to give the developer access to raw Html, Css, and JavaScript code without relying on an IDE. The framework uses JavaScript ajax calls to load new scenes, thus requires a web server on certain browsers (but not all, the latest Firefox allows ajax calls without a server, but Chrome does not). The 1.0 release will include a CLI app that can start a local web server, but an Electron-based app may also be an option.

This is the documentation for story developers using btif.

The current version of btif is version 0.2, focusing on the Saving and Loading API.