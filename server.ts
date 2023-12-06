// @ts-ignore
import osc from "osc";
import WebSocket from "ws";
import { promises } from "fs";
const { readFile, writeFile } = promises;

const wss = new WebSocket.Server({ port: 8085 });
const oscPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 8011,
  remotePort: 8010, // MadMapper
  remoteAddress: "127.0.0.1", // MadMapper
});
oscPort.open();

wss.on("connection", async (ws: WebSocket) => {
  console.log("New client connected");

  oscPort.on("message", function (oscMsg) {
    if (oscMsg.address !== "/capiche/text/action") return;
    ws.send(JSON.stringify({ action: oscMsg.args[0] }));
  });

  try {
    const presets = await readFile("./presets.json", "utf8");
    const data = JSON.stringify({ presets });
    ws.send(data);
  } catch (error) {
    console.log(`presets.json does not exist. Creating ...`);
    await writeFile("./presets.json", JSON.stringify([], null, 2), "utf8");
  }

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
