package generate

import (
	"fmt"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

func File(w *Writer, f *descriptor.FileDescriptorProto) error {
	w.P("//")
	w.P("// generated file, do not modify")
	w.P("//")

	if deps := f.GetDependency(); len(deps) > 0 {
		w.P()
		for _, dep := range deps {
			if err := Dependency(w, dep); err != nil {
				return fmt.Errorf("Dependency: %v", err)
			}
		}
	}

	// generate the service interfaces first, for a good dev UX.
	// Ie, people may open the file and care about viewing the interface,
	// the actual implementation is less important.
	for _, s := range f.GetService() {
		if err := ServiceInterface(w, f, s); err != nil {
			return fmt.Errorf("Service: %v", err)
		}
	}

	for _, e := range f.GetEnumType() {
		if err := Enum(w, e); err != nil {
			return fmt.Errorf("Message: %v", err)
		}
	}

	for _, m := range f.GetMessageType() {
		if err := Message(w, f, m); err != nil {
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
