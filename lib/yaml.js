import { CORE_SCHEMA, load, mergeTag } from 'js-yaml'

// js-yaml loads with the YAML 1.2 core schema, which leaves out the !!merge
// (<<) tag that Buildkite pipeline YAML relies on
const schema = CORE_SCHEMA.withTags(mergeTag)

export default function (source) {
  return load(source, { schema })
}
