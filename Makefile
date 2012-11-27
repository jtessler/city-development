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
		--root cidev/ \
		--compiler_jar $(CC_JAR) \
		--namespace "cidev.init"

INDEX_OUTPUT = index.html
JS_OUTPUT = city-development-min.js
SHADER_OUTPUT = cidev/webgl/shaders.js

all: shaders
	$(CC) --output_mode compiled > $(JS_OUTPUT)
	build/index.py --js $(JS_OUTPUT) > $(INDEX_OUTPUT)

debug: shaders
	build/index.py --js `$(CC) --output_mode list` > $(INDEX_OUTPUT)

shaders:
	build/shaders.py > $(SHADER_OUTPUT)

clean:
	rm -f $(JS_OUTPUT) $(SHADER_OUTPUT) $(INDEX_OUTPUT)

closure: closure-library closure-compiler

closure-library:
	svn checkout $(LIB_URL) $(LIB_PATH)

closure-compiler:
	wget $(CC_URL) -O /tmp/cc.zip
	unzip -o /tmp/cc.zip -d $(CC_PATH)
