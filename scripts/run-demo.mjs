import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');
const port = process.env.DEMO_PORT ?? '3101';

const child = spawn(
  process.execPath,
  [nextBin, 'dev', '--turbopack', '--port', port],
  {
    env: {
      ...process.env,
      ADMIN_DEMO_MODE: 'true',
    },
    stdio: 'inherit',
  },
);

child.on('error', (error) => {
  console.error('Unable to start the demo server:', error.message);
  process.exitCode = 1;
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exitCode = code ?? 1;
});
