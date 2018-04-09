# Buildkite Plugin Linter

A linter for your [Buildkite plugins](https://buildkite.com/docs/agent/v3/plugins) ✨

Features:

* Checks that all readme examples match the plugin’s [JSON schema](http://json-schema.org) file

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

If you have Node installed:

```bash
npm install
npm test
bin/lint --help
```

If not, you can use [Docker Compose](https://docs.docker.com/compose/):

```bash
docker-compose run test
docker-compose run lint --help
```

## Roadmap

* Check the version numbers in the readme examples are up-to-date
* Check all the plugin’s configuration options are documented in both the readme and the schema.yml

## License

MIT (see [LICENSE](LICENSE))