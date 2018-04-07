FROM       ruby:2.5.1-alpine
RUN        gem install json-schema
WORKDIR    /src
ADD        example-validator.rb .
ENTRYPOINT ["ruby", "example-validator.rb"]