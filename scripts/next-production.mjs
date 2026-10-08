/**
 * Runs a production Next.js command (`build` or `start`) with
 * NODE_ENV=production, regardless of the caller's shell environment.
 *
 * Why: a NODE_ENV=development left in a machine's environment makes
 * `next build` prerender with development React and fail. Next only sets
 * NODE_ENV itself when it is unset, so we pin it here. Dependency-free and
 * cross-platform. `next dev` is not wrapped and keeps its normal behaviour.
 *
 * Usage: node scripts/next-production.mjs <build|start> [...next args]
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const [command, ...args] = process.argv.slice(2);

if (command !== "build" && command !== "start") {
  console.error("Usage: node scripts/next-production.mjs <build|start> [...args]");
  process.exit(1);
}

const child = spawn(process.execPath, [nextBin, command, ...args], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
