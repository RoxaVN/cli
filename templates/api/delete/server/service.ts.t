---
to: src/server/services/<%= h.changeCase.dot(api_source_name) %>.ts
inject: true
append: true
skip_if: '\.delete\)'
---
<%= '' %>
@serverModule.useApi(<%= h.changeCase.camel(api_source_name) %>Api.delete)
export class Delete<%= h.changeCase.pascal(api_source_name) %>ApiService extends InjectDatabaseService {
  async handle(request: InferApiRequest<typeof <%= h.changeCase.camel(api_source_name) %>Api.delete>) {
    await this.entityManager
      .getRepository(<%= h.changeCase.pascal(api_source_name) %>)
      .delete({ id: request.<%= h.changeCase.camel(api_source_name) %>Id });
    return {}
  }
}