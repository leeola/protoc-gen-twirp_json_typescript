package main

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"os"

	"github.com/gogo/protobuf/proto"
	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
	"github.com/leeola/protoc-gen-twirp_json_typescript/generate"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	if err := Main(); err != nil {
		log.Fatal().Err(err).Msg("main failed")
	}
}

func Main() error {
	logfile := os.Getenv("TWIRP_JSON_TYPESCRIPT_LOG_FILE")

	if logfile != "" {
		logOutput, err := os.OpenFile(logfile, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
		if err != nil {
			return fmt.Errorf("OpenFile: %v", err)
		}
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: logOutput})
	} else {
		zerolog.SetGlobalLevel(zerolog.Disabled)
	}

	req, err := unmarshalRequest()
	if err != nil {
		return fmt.Errorf("unmarshalRequest: %v", err)
	}

	res, err := generate.Generate(req)
	if err != nil {
		return fmt.Errorf("Generate: %v", err)
	}

	if err := marshalResponse(res); err != nil {
		return fmt.Errorf("marshalResponse: %v", err)
	}

	return nil
}

func unmarshalRequest() (plugin.CodeGeneratorRequest, error) {
	b, err := ioutil.ReadAll(os.Stdin)
	if err != nil {
		return plugin.CodeGeneratorRequest{}, fmt.Errorf("ReadAll: %v", err)
	}

	var req plugin.CodeGeneratorRequest
	if err := proto.Unmarshal(b, &req); err != nil {
		return plugin.CodeGeneratorRequest{}, fmt.Errorf("proto Unmarshal: %v", err)
	}

	return req, nil
}

func marshalResponse(res *plugin.CodeGeneratorResponse) error {
	b, err := proto.Marshal(res)
	if err != nil {
		return fmt.Errorf("Marshal: %v", err)
	}

	if _, err := io.Copy(os.Stdout, bytes.NewReader(b)); err != nil {
		return fmt.Errorf("Copy: %v", err)
	}

	return nil
}
