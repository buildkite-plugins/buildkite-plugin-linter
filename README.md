# Buildkite Plugin Linter [![Build status](https://badge.buildkite.com/a5a4521a3d026931873c0ad26e1596641273dae5a730c0f90c.svg?branch=master)](https://buildkite.com/buildkite/plugin-linter)

A linter for your [Buildkite plugins](https://buildkite.com/docs/agent/v3/plugins), used by the [plugin-linter Buildkite plugin](https://github.com/buildkite-plugins/plugin-linter-buildkite-plugin) ✨

Features:

* Checks for a plugin.yml file (and validates it against [the plugin.yml JSON schema](lib/plugin-yaml-schema.yml))
* Checks that all readme examples match the plugin’s schema
* Check the readme version numbers are up-to-date with the latest plugin version
* Machine-parseable TAP output

Further reading and tools:

* [JSON Schema](http://json-schema.org)
* [JSON Schema Lint](https://jsonschemalint.com/)

## Configuration

Options available on the executable as long-form switches (`--OPTION`) can also be passed through as environment variables with the `PLUGIN_` prefix (`PLUGIN_OPTION`).

### Required

#### `id` (string, `PLUGIN_ID`)

This is the id of the plugin to be validated. It is used to search for and validate examples.

#### `path` (string, `PLUGIN_PATH`)

Where the plugin to lint can be found.

### Optional

#### `readme` (string, `PLUGIN_README`)

The name of the file to validate examples on.

Default: `README.md`

#### `skip-invalid` (boolean, `PLUGIN_SKIP_INVALID`)

Invalid versions are normally reported as failures, turning on this option would change that behaviour.

Default: `false`

## Usage

You should use this tool via the [Linter Plugin](https://github.com/buildkite-plugins/plugin-linter-buildkite-plugin) in your plugin's pipeline.

Alternatively, you can add it to your docker-compose.yml file and then use `docker-compose run --rm lint`:

```yml
services:
  lint:
    image: buildkite/plugin-linter
    command: ['--id', 'my-org/my-plugin']
    volumes:
      - ".:/plugin"
 ```

or you can run it locally on the command line:

```bash
docker run \
  -it \
  --rm \
  -v "$(pwd):/plugin" \
  buildkite/plugin-linter \
    --id my-org/my-plugin \
    --path README.md
```

If your plugin examples use a full git URL, such as `ssh://git@github.com/my-org/example-buildkite-plugin`, then you should specify the full git URL in the `id` argument.

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

## Releasing

* Master is built and tested automatically, and pushes a new image to [buildkite/plugin-linter on Docker Hub](https://hub.docker.com/r/buildkite/plugin-linter)

## License

MIT (see [LICENSE](LICENSE))
