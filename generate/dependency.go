package generate

import (
	"fmt"
	"path/filepath"
	"strings"
)

func Dependency(w *Writer, depPath string) error {
	depName := TSImportName(depPath)
	_, err := w.Pf("import * as %s from \"%s\"\n", depName, TSExt(depPath))
	if err != nil {
		return fmt.Errorf("Pf: %v", err)
	}

	return nil
}

// TSImportName returns the typescript importname from the protoc dependency
// value.
func TSImportName(depPath string) string {
	depPath = DropExt(depPath)
	// we could try escaping all non-alpha-num as underscore,
	// but for now just focus on the expected syntax - unix path sep.
	return strings.Replace(depPath, "/", "_", -1)
}

// TSExt will replace the ext with a .ts extension.
//
// Ext is determined by filepath.Ext(), which means only a single segment.
// foo.tar.gz would result in foo.tar.ts.
func TSExt(p string) string {
	return DropExt(p) + ".ts"
}

// DropExt removes the extension from p, doing nothing if no extension exists.
func DropExt(p string) string {
	ext := filepath.Ext(p)
	if ext != "" {
		return strings.TrimSuffix(p, ext)
	}
	return p
}
