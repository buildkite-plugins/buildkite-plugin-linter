import { CORE_SCHEMA, loadAll, mergeTag, YAMLException } from 'js-yaml'

// js-yaml loads with the YAML 1.2 core schema, which leaves out the !!merge
// (<<) tag that Buildkite pipeline YAML relies on
const schema = CORE_SCHEMA.withTags(mergeTag)

// Returns undefined for a stream with no documents. Callers parsing
// user-supplied YAML should default that to {}; callers parsing our own files
// want it to fail loudly instead.
export default function (source) {
  // loadAll rather than load, which throws when there are no documents
  const documents = loadAll(source, { schema })

  if (documents.length > 1) {
    throw new YAMLException('expected a single document in the stream, but found more')
  }

  return documents[0]
}
