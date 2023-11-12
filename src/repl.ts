import { moduleManager, serviceContainer } from '@roxavn/core/server';
import repl from 'repl';
import path from 'path';

import { buildService } from './build.js';
import { cliColors } from './lib/index.js';

class ReplService {
  async run() {
    console.log('*** Must run at root folder of package ***\n');
    buildService.compile();

    const replServer = repl.start(cliColors.green('> '));
    const coreServer = await import('@roxavn/core/server');

    await moduleManager.importServerModules();

    /**
     * Run install hook of all modules
     */
    async function runInstallHooks() {
      for (const moduleInfo of moduleManager.modules) {
        try {
          if (moduleInfo.exports['./hook']) {
            if (moduleInfo.name === moduleManager.currentModule.name) {
              await runHookOfCurrentModule('InstallHook');
            } else {
              const moduleHook = await import(moduleInfo.name + '/hook');
              const installHook: any = await serviceContainer.getAsync(
                moduleHook.InstallHook
              );
              await installHook.handle();
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    /**
     * Run hook of current module
     */
    async function runHookOfCurrentModule(serviceName: string) {
      const currentModule = moduleManager.currentModule;
      const hookConfig = currentModule.exports['./hook'];
      if (hookConfig) {
        const hookPath = hookConfig['import'] || hookConfig;
        const absHookPath = path.resolve(hookPath);

        const moduleHook = await import(absHookPath);
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

    Object.assign(replServer.context, coreServer, {
      runInstallHooks,
      runHookOfCurrentModule,
    });
  }
}

export const replService = new ReplService();
