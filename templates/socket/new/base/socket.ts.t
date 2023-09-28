---
to: src/base/socket.ts
---
import { BaseSocketNamespace } from '@roxavn/module-socket/base';

import { baseModule } from './module.js';

export const baseSocket = new BaseSocketNamespace<
  {},
  {}
>(baseModule.name, { needAuth: true });
