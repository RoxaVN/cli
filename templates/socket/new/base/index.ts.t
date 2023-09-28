---
inject: true
to: src/base/index.ts
append: true
skip_if: socket
---
export * from './socket.js';