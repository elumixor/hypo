#!/usr/bin/env node

/**
 * Asset Viewer Launcher Script
 * Opens the asset viewer in the default browser
 */

import { exec } from "node:child_process";
import type { IncomingMessage } from "node:http";
import { platform } from "node:os";

const ASSET_VIEWER_URL = "http://localhost:5173/scripts/asset-viewer.html";

function openUrl(url: string) {
  const os = platform();
  let command: string;

  switch (os) {
    case "darwin": // macOS
      command = `open "${url}"`;
      break;
    case "win32": // Windows
      command = `start "${url}"`;
      break;
    default: // Linux and others
      command = `xdg-open "${url}"`;
      break;
  }

  exec(command, (error) => {
    if (error) {
      console.error("❌ Failed to open browser:", error.message);
      console.log(`🌐 Please manually open: ${url}`);
    } else {
      console.log(`🚀 Opening Asset Viewer: ${url}`);
    }
  });
}

function checkServer() {
  // Simple check to see if dev server is running
  const http = require("node:http");

  const request = http.get("http://localhost:5173", (res: IncomingMessage) => {
    if (res.statusCode === 200 || res.statusCode === 404) {
      console.log("✅ Dev server is running");
      openUrl(ASSET_VIEWER_URL);
    }
  });

  request.on("error", () => {
    console.log("⚠️  Dev server not running. Starting it now...");
    console.log("📝 Please run 'bun run dev' first, then try again.");
    process.exit(1);
  });

  request.setTimeout(2000, () => {
    console.log("⚠️  Dev server not responding. Please run 'bun run dev' first.");
    process.exit(1);
  });
}
console.log("🎮 HYPO Asset Viewer Launcher");
console.log("==============================");

checkServer();
