---
to: src/server/services/setting.ts
---
import { InferApiRequest } from '@roxavn/core/base';
import { BaseService, inject } from '@roxavn/core/server';
import {
  UpsertSettingService,
  serverModule as utilsServerModule,
} from '@roxavn/module-utils/server';

import { constants, settingApi } from '../../base/index.js';
import { serverModule } from '../module.js';

@serverModule.useApi(settingApi.update<%= h.changeCase.pascal(setting_name) %>Setting)
export class Update<%= h.changeCase.pascal(setting_name) %>SettingApiService extends BaseService {
  constructor(
    @inject(UpsertSettingService)
    private updateSettingService: UpsertSettingService
  ) {
    super();
  }

  async handle(
    request: InferApiRequest<typeof settingApi.update<%= h.changeCase.pascal(setting_name) %>Setting>
  ) {
    return this.updateSettingService.handle({
      module: utilsServerModule.name,
      name: constants.<%= h.changeCase.constant(setting_name) %>_SETTING,
      metadata: request,
      type: 'private',
    });
  }
}
