import { initEnv } from '@roxavn/core/server';
import { Argument, Command } from 'commander';

import { buildService } from './build.js';
import { devService } from './dev.js';
import { moduleService } from './module.js';
import { templateService } from './template.js';
import { replService } from './repl.js';
import { migrationService } from './migration.js';
import { serveService } from './serve.js';
import { compressService } from './compress.js';

initEnv();
const program = new Command();

program
  .name('RoxavN cli')
  .description('Support roxavn development')
  .version('0.1.0');

program
  .command('sync')
  .description('sync module after installing')
  .action(() => moduleService.sync());

program
  .command('compress')
  .description('compress images in static folder')
  .option('-q, --quality <number>', 'image quality (default 60)')
  .option('-s, --source <string>', 'source folder (default static)')
  .option(
    '-t, --threshold <number>',
    'compression threshold (default 0.1). Not update file if compression ratio < compression threshold'
  )
  .action((options) => compressService.run(options));

program
  .command('gen <generator> [action]')
  .description('generate from template')
  .action((generator: string, action?: string) =>
    templateService.generate([generator, action || 'new'])
  );

program
  .command('migration')
  .description('database migration')
  .addArgument(
    new Argument('[mode]', 'migration mode').choices(['run', 'revert'])
  )
  .action((mode: string) => {
    if (mode === 'run') {
      migrationService.run();
    } else if (mode === 'revert') {
      migrationService.revert();
    } else {
      migrationService.generate();
    }
  });

program
  .command('dev')
  .description('run dev server')
  .action(() => devService.run());

program
  .command('serve')
  .description('run production server')
  .action(() => serveService.run());

program
  .command('repl')
  .description('run repl server')
  .action(() => replService.run());

program
  .command('build')
  .description('build module for publish')
  .action(() => buildService.compile());

export default program;
