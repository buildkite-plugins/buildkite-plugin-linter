import { CORE_SCHEMA, loadAll, mergeTag } from 'js-yaml'

// js-yaml loads with the YAML 1.2 core schema, which leaves out the !!merge
// (<<) tag that Buildkite pipeline YAML relies on
const schema = CORE_SCHEMA.withTags(mergeTag)

export default function (source) {
  // loadAll, because load throws on a stream with no documents. An empty
  // plugin.yml should fail schema validation rather than abort the lint run.
  const documents = loadAll(source, { schema })

  if (documents.length > 1) {
    throw new Error('expected a single YAML document')
  }

  return documents[0] ?? {}
}
