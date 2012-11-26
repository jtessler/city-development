# Closure Library variables.
LIB_URL = http://closure-library.googlecode.com/svn/trunk/
LIB_PATH = closure/library

# Closure Compiler variables.
CC_URL = http://closure-compiler.googlecode.com/files/compiler-latest.zip
CC_PATH = closure/compiler
CC_JAR = $(CC_PATH)/compiler.jar

# Closure closurebuilder.py arguments.
CC = $(LIB_PATH)/closure/bin/build/closurebuilder.py \
		--root $(LIB_PATH) \
		--root js/ \
		--compiler_jar $(CC_JAR) \
		--namespace "webgl.start"

JS_OUTPUT = js/city-development-min.js
GLSL_SOURCES = glsl/vertex.vert glsl/fragment.frag

# Index templating arguments.
INDEX_PY = tmpl/index.py --glsl $(GLSL_SOURCES)

all:
	$(CC) --output_mode compiled > $(JS_OUTPUT)
	$(INDEX_PY) --js $(JS_OUTPUT)

debug:
	$(INDEX_PY) --js `$(CC) --output_mode list`

clean:
	rm -f $(JS_OUTPUT) index.html

closure: closure-library closure-compiler

closure-library:
	svn checkout $(LIB_URL) $(LIB_PATH)

closure-compiler:
	wget $(CC_URL) -O /tmp/cc.zip
	unzip -o /tmp/cc.zip -d $(CC_PATH)
