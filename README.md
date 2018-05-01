# Buildkite Plugin Linter ![Build status](https://badge.buildkite.com/059f4510165dc84f2a2036a70136401d4b027828ba112a7944.svg?branch=master)

A linter for your [Buildkite plugins](https://buildkite.com/docs/agent/v3/plugins), used by the [plugin-linter Buildkite plugin](https://github.com/buildkite-plugins/plugin-linter-buildkite-plugin) ✨

Features:

* Checks for a plugin.yml file (and validates it against [the plugin.yml JSON schema](lib/plugin-yaml-schema.yml))
* Checks that all readme examples match the plugin’s schema
* Check the readme version numbers are up-to-date with the latest plugin version
* Machine-parseable TAP output

Further reading and tools:

* [JSON Schema](http://json-schema.org)
* [JSON Schema Lint](https://jsonschemalint.com/)

## Usage

Usually this tool is used via the [Linter Plugin](https://github.com/buildkite-plugins/plugin-linter-buildkite-plugin), but can also be run locally on the command line:

```bash
docker run \
  -it \
  --rm \
  -v "$(pwd):/plugin" \
  buildkite/plugin-linter \
    --name my-org/my-plugin
```

## Roadmap / TODO

* Check that all the config options in the readme exist in the configuration schema
* Check that all the options in the configuration schema exist in the readme
* Warn about undocumented config options found in source code

Contributions welcome! ❤️

## Developing/testing

If you have Node installed:

```bash
npm install
npm test
bin/lint --help
```

Code style is validated using [JavaScript Standard Style](https://standardjs.com).

To run the tests using [Docker Compose](https://docs.docker.com/compose/):

```bash
# Run the tests
docker-compose run --rm linter
# Run the lint command
docker-compose run --rm linter lint --help
```

## License

MIT (see [LICENSE](LICENSE))