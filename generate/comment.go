package generate

import (
	"strings"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
	"github.com/rs/zerolog/log"
)

const (
	// field includes service methods it seems.
	sourceTypeField   = 2
	sourceTypeMessage = 4
	sourceTypeService = 6
)

type PathLoc struct {
	file          *descriptor.FileDescriptorProto
	locationIndex int
	Path          []int32
	loc           *descriptor.SourceCodeInfo_Location
}

func NewPathLoc(f *descriptor.FileDescriptorProto) PathLoc {
	return PathLoc{file: f}
}

func (pl PathLoc) NestMessage(index int) PathLoc {
	return pl.nestType(sourceTypeMessage, index)
}

func (pl PathLoc) NestService(index int) PathLoc {
	return pl.nestType(sourceTypeService, index)
}

func (pl PathLoc) nestType(locType int32, index int) PathLoc {
	startIndex := pl.locationIndex
	locs, ok := pl.getLocs(startIndex)
	if !ok {
		return PathLoc{}
	}

	nextPath := nestPath(pl.Path, locType, int32(index))

	locIndex, loc, ok := matchPath(locs, nextPath)
	if !ok {
		return PathLoc{}
	}

	return PathLoc{
		file:          pl.file,
		locationIndex: locIndex,
		Path:          nextPath,
		loc:           loc,
	}
}

func (pl PathLoc) NextMessage(index int) PathLoc {
	startIndex := pl.locationIndex
	locs, ok := pl.getLocs(startIndex)
	if !ok {
		return PathLoc{}
	}

	nextPath := setPathIndex(pl.Path, int32(index))

	locIndex, loc, ok := matchPath(locs, nextPath)
	if !ok {
		return PathLoc{}
	}

	return PathLoc{
		file:          pl.file,
		locationIndex: locIndex,
		Path:          nextPath,
		loc:           loc,
	}
}

func (pl PathLoc) LeadingComments() []string {
	if pl.loc == nil {
		log.Warn().Ints32("path", pl.Path).Msg("unable to locate path")
		return nil
	}
	c := pl.loc.GetLeadingComments()
	if c == "" {
		return nil
	}
	// last char appears to be a newline. Drop it.
	c = c[:len(c)-1]
	return strings.Split(c, "\n")
}

func (pl PathLoc) TrailingComments() []string {
	if pl.loc == nil {
		log.Warn().Ints32("path", pl.Path).Msg("unable to locate path")
		return nil
	}
	c := pl.loc.GetTrailingComments()
	if c == "" {
		return nil
	}
	// last char appears to be a newline. Drop it.
	c = c[:len(c)-1]
	return strings.Split(c, "\n")
}

func (pl PathLoc) getLocs(locStart int) ([]*descriptor.SourceCodeInfo_Location, bool) {
	sci := pl.file.GetSourceCodeInfo()
	if sci == nil {
		return nil, false
	}

	locs := sci.GetLocation()
	if locStart >= len(locs) {
		return nil, false
	}

	return locs[locStart:], true
}

func matchPath(locs []*descriptor.SourceCodeInfo_Location, p []int32) (int, *descriptor.SourceCodeInfo_Location, bool) {
	for i, loc := range locs {
		if equalPath(p, loc.GetPath()) {
			return i, loc, true
		}
	}
	return 0, nil, false
}

func equalPath(a, b []int32) bool {
	if len(a) != len(b) {
		return false
	}
	for i, ae := range a {
		if ae != b[i] {
			return false
		}
	}
	return true
}

func nestPath(srcP []int32, typeNum, index int32) []int32 {
	dstP := make([]int32, len(srcP))
	copy(dstP, srcP)
	return append(dstP, typeNum, index)
}

func setPathIndex(srcP []int32, index int32) []int32 {
	dstP := make([]int32, len(srcP))
	copy(dstP, srcP)
	dstP[len(dstP)-1] = index
	return dstP
}
