---
to: src/web/socket.ts
---
import { WebSocketNamespace } from '@roxavn/module-socket/web';

import { baseSocket } from '../base/index.js';

export const webSocket = WebSocketNamespace.fromBase(baseSocket);
