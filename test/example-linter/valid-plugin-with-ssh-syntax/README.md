# Example

```yaml
steps:
  - plugins:
      - ssh://git@github.com/my-org/example-buildkite-plugin#v1.2.3:
          option: value
```

## Example with .git

```yaml
steps:
  - plugins:
      - ssh://git@github.com/my-org/example-buildkite-plugin.git#v1.2.3:
          option: value
```