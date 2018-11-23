package generate

import (
	"fmt"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

func File(w *Writer, f *descriptor.FileDescriptorProto) error {
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

	return nil
}
