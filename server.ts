// @ts-ignore
import osc from "osc";
import WebSocket from "ws";
import { promises } from "fs";
const { readFile, writeFile } = promises;

const wss = new WebSocket.Server({ port: 8085 });
const oscPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 8011,
  remotePort: 8010,
  remoteAddress: "127.0.0.1",
});
oscPort.open();

wss.on("connection", async (ws: WebSocket) => {
  console.log("New client connected");
  const presets = await readFile("./presets.json", "utf8");
  ws.send(presets);

  ws.on("message", async (signal: string) => {
    const { cmd, data } = JSON.parse(signal);
    if (cmd === "osc") {
      const { address, args } = data;
      oscPort.send({
        address,
        args,
      });
      return;
    }
    if (cmd === "writePreset") {
      await writeFile("./presets.json", JSON.stringify(data, null, 2), "utf8");
      return;
    }
  });
});
