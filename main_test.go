package main

import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
	"testing"
)

const (
	// hardcoding a version requirement for consistency.
	// In the future i'd like to support multiple versions,
	// but explicitly test against each one.
	tscVersion    = "3.1.6"
	protocVersion = "3.1.5"

	pluginName = "twirp_json_typescript"
)

var (
	pluginLog   string
	onlyProto   string
	alphaNumReg *regexp.Regexp
)

func init() {
	flag.StringVar(&pluginLog, "plugin-log", "", "file to write plugin logs to")
	flag.StringVar(&onlyProto, "only-proto", "", "test against the specified proto")

	alphaNumReg = regexp.MustCompile("[^a-zA-Z0-9]+")
}

func TestTypescript(t *testing.T) {
	flag.Parse()

	os.Mkdir("_tmp", 0755)

	if err := verifyReqs(); err != nil {
		t.Fatalf("verifyReqs: %v", err)
	}

	var tested bool
	err := filepath.Walk("_example_proto", func(protoPath string, fi os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if fi.IsDir() {
			return nil
		}

		protoPath, err = filepath.Rel("_example_proto", protoPath)
		if err != nil {
			return fmt.Errorf("Rel: %v", err)
		}

		if onlyProto != "" && onlyProto != protoPath {
			// skip protos not matching onlyProto
			return nil
		}
		tested = true

		tmpDir, err := ioutil.TempDir("_tmp", "typescript")
		if err != nil {
			return fmt.Errorf("TempDir: %v", err)
		}
		defer os.RemoveAll(tmpDir)

		t.Logf("testing tmp %q, proto %q", tmpDir, protoPath)

		pluginPath := filepath.Join(tmpDir, fmt.Sprintf("protoc-gen-%s", pluginName))
		if err := buildPlugin(pluginPath); err != nil {
			t.Fatalf("buildPlugin: %v", err)
		}

		tsDir := filepath.Join("_example_typescript", alphaNumReg.ReplaceAllString(protoPath, "_"))
		if err := compileProto(t, pluginPath, protoPath, tsDir); err != nil {
			t.Fatalf("compileProto: %v", err)
		}

		jsDir := filepath.Join(tmpDir, "javascript")
		if err := compileTypescript(t, protoPath, tsDir, jsDir); err != nil {
			t.Errorf("compileTypescript: %v", err)
			return nil
		}

		return nil
	})
	if err != nil {
		t.Fatalf("walk protos: %v", err)
	}

	if !tested {
		if onlyProto != "" {
			t.Errorf("no matching proto tests for %q", onlyProto)
		} else {
			t.Errorf("no protos tested")
		}
	}
}

func verifyReqs() error {
	return nil
}

func buildPlugin(pluginPath string) error {
	cmd := exec.Command("go", "build", "-o", pluginPath, ".")
	return cmd.Run()
}

func compileProto(t *testing.T, pluginPath, protoPath, tsDir string) error {
	if err := os.MkdirAll(tsDir, 0755); err != nil {
		return fmt.Errorf("MkdirAll: %v", err)
	}

	cmd := exec.Command("protoc",
		"--proto_path", "_example_proto",
		fmt.Sprintf("--plugin=%s", pluginPath),
		fmt.Sprintf("--%s_out=%s", pluginName, tsDir),
		protoPath,
	)

	stderr, err := cmd.StderrPipe()
	if err != nil {
		fmt.Errorf("protoc StderrPipe: %v", err)
	}
	go logReadCloser(t, "protoc stderr", stderr)

	if pluginLog != "" {
		cmd.Env = setEnv(os.Environ(), "TWIRP_JSON_TYPESCRIPT_LOG_FILE", "_tmp/plugin.log")
	} else {
		cmd.Env = delEnv(os.Environ(), "TWIRP_JSON_TYPESCRIPT_LOG_FILE")
	}

	return cmd.Run()
}

func compileTypescript(t *testing.T, protoPath, tsDir, jsDir string) error {
	tsPath := filepath.Join(tsDir, strings.TrimSuffix(protoPath, ".proto")+".ts")
	cmd := exec.Command("tsc",
		"--outDir", jsDir,
		tsPath)

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		fmt.Errorf("tsc StdoutPipe: %v", err)
	}
	go logReadCloser(t, "typescript compiler stdout", stdout)

	return cmd.Run()
}

func setEnv(env []string, key, value string) []string {
	for i, e := range env {
		ek := strings.SplitN(e, "=", 2)[0]
		if ek == key {
			env[i] = fmt.Sprintf("%s=%s", key, value)
			return env
		}
	}
	return append(env, fmt.Sprintf("%s=%s", key, value))
}

func delEnv(env []string, key string) []string {
	for i, e := range env {
		ek := strings.SplitN(e, "=", 2)[0]
		if ek == key {
			return append(env[:i], env[i+1:]...)
		}
	}
	return env
}

func logReadCloser(t *testing.T, logName string, rc io.ReadCloser) {
	defer rc.Close()

	scanner := bufio.NewScanner(rc)
	for scanner.Scan() {
		t.Logf("%s: %s", logName, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		t.Fatalf("%s scanner: %v", logName, err)
	}
}
