package generate

import (
	"fmt"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
	"github.com/rs/zerolog/log"
)

func File(w *Writer, f *descriptor.FileDescriptorProto) error {

	log.Info().Msgf("file? %#v", f)

	w.P("//")
	w.P("// generated file, do not modify")
	w.P("//")

	w.P()
	for _, dep := range f.GetDependency() {
		if err := Dependency(w, dep); err != nil {
			return fmt.Errorf("Dependency: %v", err)
		}
	}

	// for _, s := range f.GetService() {
	//   if err := Service(s); err != nil {
	//     return fmt.Errorf("Service: %v",err)
	//   }
	// }

	return nil
}
