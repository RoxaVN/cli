---
to: src/server/services/<%= h.changeCase.dot(api_source_name) %>.ts
inject: true
append: true
skip_if: '\.upsert\)'
---
<%= '' %>
@serverModule.useApi(<%= h.changeCase.camel(api_source_name) %>Api.upsert)
export class Upsert<%= h.changeCase.pascal(api_source_name) %>ApiService extends InjectDatabaseService {
  async handle(request: InferApiRequest<typeof <%= h.changeCase.camel(api_source_name) %>Api.upsert>) {
    const result = await this.entityManager
      .createQueryBuilder(<%= h.changeCase.pascal(api_source_name) %>, '<%= h.changeCase.camel(api_source_name) %>')
      .insert()
      .values({
      })
      .orUpdate([], [])
      .execute();

    return { id: result.generatedMaps[0].id };
  }
}