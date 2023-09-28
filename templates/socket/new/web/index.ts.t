---
inject: true
to: src/web/index.ts
append: true
skip_if: socket
---
export * from './socket.js';