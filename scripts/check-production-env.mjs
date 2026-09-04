#!/usr/bin/env node
/**
 * Light production-env presence check. Prints variable NAMES only — never values.
 * Exit 0 when Next production baseline is set; exit 1 with a short list of gaps.
 *
 * Usage:
 *   node scripts/check-production-env.mjs
 *   node scripts/check-production-env.mjs --strapi   # also check cms/.env if present
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvFile(filePath, into) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (into[key] === undefined || into[key] === "") into[key] = value;
  }
}

const root = path.resolve(__dirname, "..");
const env = { ...process.env };
loadEnvFile(path.join(root, ".env.local"), env);
loadEnvFile(path.join(root, ".env"), env);
loadEnvFile(path.join(root, "deploy", ".env.prod"), env);

const checkStrapi = process.argv.includes("--strapi");
if (checkStrapi) {
  loadEnvFile(path.join(root, "cms", ".env"), env);
}

function present(key) {
  return Boolean(String(env[key] ?? "").trim());
}

function looksLocal(url) {
  const u = String(url ?? "").toLowerCase();
  return (
    !u ||
    u.includes("localhost") ||
    u.includes("127.0.0.1") ||
    u.startsWith("http://")
  );
}

const requiredNext = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_STRAPI_URL",
  "STRAPI_API_TOKEN",
];

const missing = requiredNext.filter((k) => !present(k));
const warnings = [];

if (present("NEXT_PUBLIC_SITE_URL") && looksLocal(env.NEXT_PUBLIC_SITE_URL)) {
  warnings.push(
    "NEXT_PUBLIC_SITE_URL still looks local/non-HTTPS (expected after NH-1)",
  );
}
if (
  present("NEXT_PUBLIC_STRAPI_URL") &&
  looksLocal(env.NEXT_PUBLIC_STRAPI_URL)
) {
  warnings.push(
    "NEXT_PUBLIC_STRAPI_URL still looks local/non-HTTPS (expected after deploy)",
  );
}

if (checkStrapi) {
  const requiredCms = [
    "APP_KEYS",
    "API_TOKEN_SALT",
    "ADMIN_JWT_SECRET",
    "JWT_SECRET",
    "DATABASE_CLIENT",
    "DATABASE_HOST",
    "DATABASE_NAME",
    "DATABASE_USERNAME",
    "DATABASE_PASSWORD",
  ];
  for (const k of requiredCms) {
    if (!present(k)) missing.push(`cms:${k}`);
  }
  if (!present("PUBLIC_URL") || looksLocal(env.PUBLIC_URL)) {
    warnings.push(
      "PUBLIC_URL missing or local (set HTTPS CMS origin in production)",
    );
  }
}

console.log("NCP production env check (names only)");
console.log(
  missing.length === 0
    ? "Required Next baseline: OK"
    : `Missing: ${missing.join(", ")}`,
);
for (const w of warnings) console.log(`Warning: ${w}`);

if (!present("STRIPE_SECRET_KEY")) {
  console.log("Note: STRIPE_SECRET_KEY unset — card path Needs human NH-3");
} else {
  const sk = String(env.STRIPE_SECRET_KEY).trim();
  if (sk.startsWith("sk_live_")) {
    console.log("Stripe: live secret present (run docs/stripe-live-smoke.md)");
  } else if (sk.startsWith("sk_test_")) {
    console.log(
      "Stripe: test secret present — live smoke still Needs human NH-3 (sk_live_)",
    );
  } else {
    console.log("Stripe: secret present (prefix not sk_test_/sk_live_)");
  }
}
if (!present("MAIL_FROM")) {
  console.log("Note: MAIL_FROM unset — MailPort stays noop until NH-6");
}

process.exit(missing.length === 0 ? 0 : 1);
