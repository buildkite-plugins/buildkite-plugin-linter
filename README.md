# Buildkite Plugin Example Validator

A tool for validating a [Buildkite plugin](https://buildkite.com/docs/agent/v3/plugins)’s readme examples against its JSON schema file ✨

## Usage

In a plugin’s pipeline.yml test suite:

```yaml
  - label: ":json:"
    plugins:
      docker#x.x.x:
        image: buildkite/plugin-example-validator
        workdir: /plugin
        always-pull: true
        environment:
          - PLUGIN_NAME=my-plugin
          - PLUGIN_SCHEMA=/plugin/schema.yml
          - PLUGIN_README=/plugin/README.md
```

On the command line:

```bash
docker run -it --rm -v "$(pwd):/plugin" buildkite/plugin-example-validator my-plugin /plugin/schema.yml /plugin/README.md
```

## License

MIT (see [LICENSE](LICENSE))