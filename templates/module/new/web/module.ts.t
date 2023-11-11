---
to: src/web/module.ts
sh: npm i && npm roxavn sync
---
import { WebModule } from '@roxavn/core/web';
import { baseModule } from '../base/index.js';

export const webModule = WebModule.fromBase(baseModule);
