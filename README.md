# About:

Pipes messages coming in via WebSocket to OSC. Needed this small middleware to be able to save presets and to send OSC from a client.

## Requirements:

`nodejs`

## Installation:

`npm install -g ts-node`

`npm install` in the project root

## Usage:

`ts-node server.ts`

## Config:

WebSocket server port defaults to `8085`

MadMapper OSC destination port defaults to `8010`

MadMapper OSC destination IP defaults to `127.0.0.1`

All these may be changed in `server.ts`

## TODO:

Maybe use another osc library as the current one may crash on oncoming OSC messages that we do not use. https://www.npmjs.com/package/osc-js

Just need to restart if it crashes
