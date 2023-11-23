# About:

Pipes messages coming in via WebSocket to OSC. Needed this small middleware to be able to save presets and to send OSC from a client.

## Installation:

`npm install`

## Usage:

`ts-node server.ts`

## Config:

WebSocket server port defaults to `8085`

MadMapper OSC destination port defaults to `8010`

MadMapper OSC destination IP defaults to `127.0.0.1`

All these may be changed in `server.ts`
