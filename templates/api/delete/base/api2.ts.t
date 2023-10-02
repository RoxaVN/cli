---
to: src/base/apis/<%= h.changeCase.dot(api_source_name) %>.ts
inject: true
after: export const
skip_if: '\.delete\('
---
  delete: <%= api_source_name %>Source.delete({
    validator: Delete<%= h.changeCase.pascal(api_source_name) %>Request,
    permission: permissions.Delete<%= h.changeCase.pascal(api_source_name) %>,
  }),