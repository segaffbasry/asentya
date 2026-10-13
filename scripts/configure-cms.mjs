import { randomBytes, scryptSync } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";

if (!process.stdin.isTTY) throw new Error("Run this setup in an interactive terminal.");
const terminal = createInterface({ input: process.stdin, output: process.stdout });
// Mask the password while the owner types it. Only a salted hash is saved.
let hidden = false;
terminal._writeToOutput = (value) => { process.stdout.write(hidden ? (value.includes("\n") ? "\n" : "*") : value); };
process.stdout.write("Set the article editor password: "); hidden = true;
const password = await terminal.question(""); hidden = false;
terminal.close();
if (!password || password.length > 256) throw new Error("Enter a password of 1–256 characters.");
const salt = randomBytes(32).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
await writeFile(new URL("../.env.cms.local", import.meta.url), [
  "CMS_ADMIN_EMAIL=admin@asentya.com",
  `CMS_PASSWORD_HASH=${salt}:${hash}`,
  `CMS_SESSION_SECRET=${randomBytes(48).toString("base64url")}`,
  "CMS_GITHUB_TOKEN=",
].join("\n") + "\n", { mode: 0o600 });
console.log("Saved private settings in .env.cms.local. Add these to the Vercel project, complete CMS_GITHUB_TOKEN, and redeploy. The password was not stored.");
