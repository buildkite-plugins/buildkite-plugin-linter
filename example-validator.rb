require 'json-schema'

# Usage: example-validator.rb schema readme

schema_path = ARGV[0]
readme_path = ARGV[1]

unless schema_path && readme_path
  abort "Usage: example-validator.rb schema readme\n\nExample: example-validator.rb /plugin/schema.yml /plugin/README.md"
end

schema = YAML.load(File.read(schema_path))
readme = File.read(readme_path)

readme.scan(/```yml(.*?)```/m).each do |(yml)|
  if config_str = yml[/plugins:.*?\n.*?\n(.*)/m, 1]
    config = YAML.load(config_str)
    JSON::Validator.validate!(schema, config)
  end
end

puts "🙌 Readme examples validate against the schema"