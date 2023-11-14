---
inject: true
to: src/base/constants.ts
after: 'export const constants'
skip_if: <%= h.changeCase.constant(setting_name) %>
---
  <%= h.changeCase.constant(setting_name) %>_SETTING: '<%= h.changeCase.camel(setting_name) %>Setting',