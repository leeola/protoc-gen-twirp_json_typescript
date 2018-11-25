package generate

import (
	"fmt"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
	"github.com/rs/zerolog/log"
)

func File(w *Writer, f *descriptor.FileDescriptorProto) error {
	log.Debug().
		Str("file", f.GetName()).
		Msg("generate file")

	w.P("//")
	w.P("// generated file, do not modify")
	w.P("//")

	pathLoc := NewPathLoc(f)

	if deps := f.GetDependency(); len(deps) > 0 {
		w.P()
		if err := Dependencies(w, f, deps); err != nil {
			return fmt.Errorf("Dependencies: %v", err)
		}
	}

	// generate the service interfaces first, for a good dev UX.
	// Ie, people may open the file and care about viewing the interface,
	// the actual implementation is less important.
	for i, s := range f.GetService() {
		if err := ServiceInterface(w, f, s, pathLoc.NestService(i)); err != nil {
			return fmt.Errorf("Service: %v", err)
		}
	}

	for _, e := range f.GetEnumType() {
		if err := Enum(w, "", e); err != nil {
			return fmt.Errorf("Message: %v", err)
		}
	}

	for i, m := range f.GetMessageType() {
		if err := Message(w, f, "", m, pathLoc.NestMessage(i)); err != nil {
			return fmt.Errorf("Message: %v", err)
		}
	}

	// finally, implement the services.
	for _, s := range f.GetService() {
		if err := ServiceImplementation(w, f, s); err != nil {
			return fmt.Errorf("Service: %v", err)
		}
	}

	return nil
}
