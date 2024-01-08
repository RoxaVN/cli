---
to: src/server/module.ts
inject: true
after: serverModule
skip_if: entities
---
<%= h.replaceFile('src/server/module.ts', '\nexport const serverModule = ServerModule.fromBase(baseModule);\n', 
`import * as entities from './entities/index.js';

export const serverModule = ServerModule.fromBase(baseModule, { entities });`) %>