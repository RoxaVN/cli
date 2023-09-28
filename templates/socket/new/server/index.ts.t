---
inject: true
to: src/server/index.ts
append: true
skip_if: socket
---
export * from './socket.js';