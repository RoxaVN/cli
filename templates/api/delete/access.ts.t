---
to: src/base/access.ts
inject: true
after: 'export const permissions'
skip_if: 'Delete<%= h.changeCase.pascal(api_source_name) %>:'
---
  Delete<%= h.changeCase.pascal(api_source_name) %>: {},