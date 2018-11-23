
# twirp_json_typescript (unstable)

A Minimal (JSON) Twirp TypeScript Generator

**this library is under active development, do not use**

## Goals

## Testing

This project aims to test both generating proto files and compiling the
TypeScript to JavaScript. In the future, TypeScript linters may be applied
during this process as well.

Running `go test .` from the root of the project will:

1. Walk over each proto file in the example proto directory.
2. Build the protoc-gen-twirp_json_typescript plugin to a tmp dir.
2. Compile each proto file to the example typescript directory.
3. Compile the main TypeScript file _(relative to the source proto file)_,
  outputting to a temporary directory.
4. Remove the tmp dir.

The test suite has a couple options to aid in debugging and development:

`go test -only-proto=name.proto .` will limit the test suite to just
the specified proto file. Note that all dependencies for the proto file
will still be compiled.

`go test -plugin-log=plugin.log .` will set the plugin env to include
`TWIRP_JSON_TYPESCRIPT_LOG_FILE=plugin.log`, causing the plugin to log debug
output to the specified `plugin.log` file. This logging is coming from the
binary process _(the plugin)_ being called by `protoc`.

## Compiler Versions

Currently tests are run against the following:

```
~ > protoc --version
libprotoc 3.5.1
~ > tsc --version
Version 3.1.6
```

In the future multiple versions may be supported and tested against.
For now, and for simplicity sake, this is not being done.

## License

MIT
