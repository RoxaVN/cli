import { moduleManager, serviceContainer } from '@roxavn/core/server';
import repl from 'repl';

import { buildService } from './build.js';
import { cliColors } from './lib/index.js';

class ReplService {
  async run() {
    buildService.compile();

    const replServer = repl.start(cliColors.green('> '));
    const coreServer = await import('@roxavn/core/server');

    await moduleManager.importServerModules();

    async function runInstallHooks() {
      for (const moduleInfo of moduleManager.modules) {
        try {
          if (moduleInfo.exports['./hook']) {
            const moduleHook = await import(moduleInfo.name + '/hook');
            const installHook: any = await serviceContainer.getAsync(
              moduleHook.InstallHook
            );
            await installHook.handle();
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    async function runHook(serviceName: string) {
      const currentModule = moduleManager.currentModule;
      if (currentModule.exports['./hook']) {
        const moduleHook = await import(currentModule.name + '/hook');
        const serviceClass = moduleHook[serviceName];
        if (serviceClass) {
          const service: any = await serviceContainer.getAsync(serviceClass);
          return await service.handle();
        }
      }
      throw new Error(
        `Not found ${serviceName} in "${currentModule.name}/hook"`
      );
    }

    Object.assign(replServer.context, coreServer, { runInstallHooks, runHook });
  }
}

export const replService = new ReplService();
