import enquirer from 'enquirer';
import execa from 'execa';
import { Logger, runner } from 'hygen';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class TemplateService {
  defaultPath = path.join(__dirname, '../templates');

  async generate(args: string[]) {
    await runner(args, {
      templates: this.defaultPath,
      cwd: process.cwd(),
      logger: new Logger(console.log.bind(console)),
      exec: (action, body) => {
        const opts = body && body.length > 0 ? { input: body } : {};
        return execa.command(action, { ...opts, shell: true });
      },
      createPrompter: () => enquirer as any,
      helpers: {
        replaceFile: (
          fileName: string,
          pattern: string,
          replacement: string
        ) => {
          const data = fs.readFileSync(fileName, 'utf8');
          fs.writeFileSync(fileName, data.replace(pattern, replacement));
        },
      },
    });
  }
}

export const templateService = new TemplateService();
