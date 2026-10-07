#!/usr/bin/env tsx

/**
 * ForeverMemoirs CLI (foremem)
 * Usage: foremem [command] [args]
 *
 * Commands:
 *   doctor             - Audit environment health (env vars, dependencies, files)
 *   dev                - Start development server
 *   restore <in> <out> - Restore a photo with the photo-lab pipeline
 *   help               - Print usage and command list
 */

import 'dotenv/config';
import minimist from 'minimist';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { spawn, execSync } from 'child_process';

dotenv.config({ path: '.env.local', override: true });

const args = minimist(process.argv.slice(2));
const command = args._[0];
const REPO_ROOT = path.resolve(__dirname, '..', '..');

async function main() {
  console.log(`🎞️  ForeverMemoirs CLI (foremem) v2.0.0`);

  if (!command || command === 'help' || args.help || args.h) {
    printHelp();
    return;
  }

  switch (command) {
    case 'doctor':
      await runDoctor();
      break;
    case 'dev':
      await runDev();
      break;
    case 'restore':
      await runRestore(args._[1], args._[2]);
      break;
    default:
      console.error(`❌ Unknown command: ${command}`);
      printHelp();
      process.exit(1);
  }
}

function printHelp() {
  console.log(`
Usage:
  foremem [command] [args] [flags]

Commands:
  dev                    Start the Next.js dev server
  doctor                 Audit environment configuration and health
  restore <in> <out>     Restore a photo with the photo-lab pipeline
  help                   Display this help message

Examples:
  foremem dev
  foremem doctor
  foremem restore scan.jpg restored.jpg
  `);
}

function check(label: string, ok: boolean, hint = '') {
  console.log(`${ok ? '✅' : '❌'} ${label}${ok || !hint ? '' : ` — ${hint}`}`);
  return ok;
}

async function runDoctor() {
  console.log('\nEnvironment audit:\n');
  let allOk = true;
  allOk &&= check('Node version', process.version.startsWith('v24') || process.version.startsWith('v22') || process.version.startsWith('v20'), `found ${process.version}, want Node 20+`);
  allOk &&= check('site/package.json', fs.existsSync(path.join(REPO_ROOT, 'site', 'package.json')));
  allOk &&= check('site/node_modules', fs.existsSync(path.join(REPO_ROOT, 'site', 'node_modules')), 'run `npm install` in site/');
  allOk &&= check('DATABASE_URL set', !!process.env.DATABASE_URL, 'orders API will only log until Neon is connected');
  const venvPy = path.join(REPO_ROOT, 'photo-lab', 'venv', 'bin', 'python');
  allOk &&= check('photo-lab venv', fs.existsSync(venvPy), 'photo restoration needs the Python venv (see photo-lab/README.md)');
  allOk &&= check('brand/logo.jpg', fs.existsSync(path.join(REPO_ROOT, 'brand', 'logo.jpg')));
  console.log(allOk ? '\nAll good.\n' : '\nSome checks failed — see hints above.\n');
}

async function runDev() {
  console.log('Starting dev server…');
  const child = spawn('npm', ['run', 'dev'], {
    cwd: path.join(REPO_ROOT, 'site'),
    stdio: 'inherit',
    shell: true,
  });
  await new Promise((resolve) => child.on('close', resolve));
}

async function runRestore(input?: string, output?: string) {
  if (!input || !output) {
    console.error('Usage: foremem restore <input> <output>');
    process.exit(1);
  }
  const venvPy = path.join(REPO_ROOT, 'photo-lab', 'venv', 'bin', 'python');
  const script = path.join(REPO_ROOT, 'photo-lab', 'restore.py');
  if (!fs.existsSync(venvPy)) {
    console.error('❌ photo-lab venv not found. See photo-lab/README.md for setup.');
    process.exit(1);
  }
  if (!fs.existsSync(script)) {
    console.error('❌ photo-lab/restore.py not found.');
    process.exit(1);
  }
  console.log(`Restoring ${input} → ${output}…`);
  try {
    execSync(`"${venvPy}" "${script}" "${input}" "${output}"`, { stdio: 'inherit', cwd: REPO_ROOT });
    console.log('✅ Done. Remember: human eyes on every photo before it ships.');
  } catch {
    console.error('❌ Restore failed.');
    process.exit(1);
  }
}

main();
