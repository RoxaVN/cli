---
to: src/base/apis/<%= h.changeCase.dot(api_source_name) %>.ts
inject: true
before: export const
skip_if: '\.getMany\('
---
export class Get<%= h.changeCase.pascal(api_source_name) %>sRequest extends PaginationRequest<Get<%= h.changeCase.pascal(api_source_name) %>sRequest> {
}
