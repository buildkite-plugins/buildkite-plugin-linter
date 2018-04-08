# Buildkite Plugin Example Validator

A tool for validating a [Buildkite plugin](https://buildkite.com/docs/agent/v3/plugin)’s readme examples against its JSON schema file.

## Usage

In a plugin’s pipeline.yml test suite:

```yaml
  - label: ":json:"
    command: /plugin/schema.yml /plugin/README.md
    plugins:
      docker#x.x.x:
        image: buildkite/plugin-example-validator
        workdir: /plugin
```

On the command line:

```bash
docker run -it --rm -v "$(pwd):/plugin" buildkite/plugin-example-validator /plugin/schema.yml /plugin/README.md
```

## License

MIT (see [LICENSE](LICENSE))
