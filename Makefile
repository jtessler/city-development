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
		--namespace "cidev.base" \
		--compiler_jar $(CC_JAR) \
		--compiler_flags "--jscomp_error=accessControls" \
		--compiler_flags "--jscomp_error=const" \
		--compiler_flags "--warning_level=VERBOSE" \
		--compiler_flags "--js=$(LIB_PATH)/closure/goog/deps.js"

INDEX_OUTPUT = index.html
JS_OUTPUT = city-development-min.js
SHADER_OUTPUT = cidev/webgl/shaders.js

debug: shaders
	build/index.py --js `$(CC) --output_mode list` > $(INDEX_OUTPUT)

release: shaders
	$(CC) --output_mode compiled > $(JS_OUTPUT)
	build/index.py --js $(JS_OUTPUT) > $(INDEX_OUTPUT)

dry-run:
	$(CC) --output_mode compiled > /dev/null

shaders:
	build/shaders.py > $(SHADER_OUTPUT)

lint:
	gjslint --exclude_files $(SHADER_OUTPUT) --unix_mode -r cidev/

clean:
	rm -f $(JS_OUTPUT) $(SHADER_OUTPUT) $(INDEX_OUTPUT)

server:
	python -m SimpleHTTPServer

closure: closure-library closure-compiler

closure-library:
	svn checkout $(LIB_URL) $(LIB_PATH)

closure-compiler:
	wget $(CC_URL) -O /tmp/cc.zip
	unzip -o /tmp/cc.zip -d $(CC_PATH)
