# Example

Merging a whole step:

```yml
common: &common
  plugins:
    - valid-example-with-merge-keys#v1.2.3:
        option: value
steps:
  - <<: *common
```

Merging into the plugin configuration:

```yml
defaults: &defaults
  option: value
steps:
  - plugins:
      - valid-example-with-merge-keys#v1.2.3:
          <<: *defaults
          other: thing
```