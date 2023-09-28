---
to: src/server/socket.ts
---
import { ServerSocketNamespace } from '@roxavn/module-socket/server';

import { baseSocket } from '../base/index.js';
import { serverModule } from './module.js';

export const serverSocket = ServerSocketNamespace.fromBase(
  baseSocket,
  serverModule
);
