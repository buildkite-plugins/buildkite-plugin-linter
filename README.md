# Buildkite Plugin Linter

A linter for your [Buildkite plugins](https://buildkite.com/docs/agent/v3/plugins), used by the [plugin-linter Buildkite plugin](https://github.com/buildkite-plugins/plugin-linter-buildkite-plugin) ✨

Features:

* Checks that all readme examples match the plugin’s [JSON schema](http://json-schema.org) file

## Usage

Usually this tool is used via the [Linter Plugin](https://github.com/buildkite-plugins/plugin-linter-buildkite-plugin), but if need be can be run locally on the command line:

```bash
docker run \
  -it \
  --rm \
  -v "$(pwd):/plugin" \
  buildkite/plugin-linter \
    --name my-plugin
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