---
to: src/base/apis/<%= h.changeCase.dot(api_source_name) %>.ts
inject: true
before: export const
skip_if: '\.delete\('
---
export class Delete<%= h.changeCase.pascal(api_source_name) %>Request extends ExactProps<Delete<%= h.changeCase.pascal(api_source_name) %>Request> {
  @MinLength(1)
  public readonly <%= api_source_name %>Id: string;
}
