# Buildkite Plugin Linter ![Build status](https://badge.buildkite.com/059f4510165dc84f2a2036a70136401d4b027828ba112a7944.svg?branch=master)

A linter for your [Buildkite plugins](https://buildkite.com/docs/agent/v3/plugins), used by the [plugin-linter Buildkite plugin](https://github.com/buildkite-plugins/plugin-linter-buildkite-plugin) ✨

Features:

* Check the plugin has a plugin.yml with required keys (according to [the plugin.yml JSON schema](lib/plugin-yaml-schema.json))
* Checks that all readme examples match the plugin’s schema

Further reading:

* [JSON schema](http://json-schema.org)

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
# Run the tests
docker-compose run --rm linter
# Run the lint command
docker-compose run --rm linter lint --help
```

## Roadmap

* Check the version numbers in the readme examples are up-to-date

## License

MIT (see [LICENSE](LICENSE))