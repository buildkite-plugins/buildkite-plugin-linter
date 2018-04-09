# Buildkite Plugin Linter

A tool for linter a [Buildkite plugin](https://buildkite.com/docs/agent/v3/plugins)✨

Features:

* Checks that all readme examples match the plugin’s JSON schema file (schema.yml)

## Usage

In a plugin’s pipeline.yml test suite:

```yaml
  - label: ":json:"
    plugins:
      docker#x.x.x:
        image: buildkite/plugin-linter
        workdir: /plugin
        environment:
          - PLUGIN_NAME=my-plugin
        always-pull: true
```

On the command line:

```bash
docker run -it --rm -v "$(pwd):/plugin" buildkite/plugin-linter --name my-plugin
```

## Developing/testing

If you want to run it locally using Node, use the following:

```bash
npm install
npm test
bin/lint --help
```

If you don't have Node, you can use [Docker Compose](https://docs.docker.com/compose/):

```bash
docker-compose run test
docker-compose run lint --help
```

## Roadmap

* Check the version numbers in the readme examples are up-to-date
* Check all the plugin’s configuration options are documented in both the readme and the schema.yml

## License

MIT (see [LICENSE](LICENSE))