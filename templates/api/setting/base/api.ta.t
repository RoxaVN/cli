---
to: src/base/apis/setting.ts
---
import {
  accessManager,
  ApiSource,
  ExactProps,
} from '@roxavn/core/base';
import { SettingResponse, permissions } from '@roxavn/module-utils/base';

import { baseModule } from '../module.js';

const settingSource = new ApiSource<SettingResponse>(
  [accessManager.scopes.Setting],
  baseModule
);

export class Update<%= h.changeCase.pascal(setting_name) %>SettingRequest extends ExactProps<Update<%= h.changeCase.pascal(setting_name) %>SettingRequest> {

}

export const settingApi = {
  update<%= h.changeCase.pascal(setting_name) %>Setting: settingSource.custom({
    method: 'POST',
    path: settingSource.apiPath() + '/<%= h.changeCase.param(setting_name) %>',
    validator: Update<%= h.changeCase.pascal(setting_name) %>SettingRequest,
    permission: permissions.UpdateSetting,
  }),
};
