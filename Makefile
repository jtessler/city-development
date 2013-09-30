# Closure Library variables.
LIB_URL = https://code.google.com/p/closure-library/
LIB_PATH = closure/library

# Closure Compiler variables.
CC_URL = http://closure-compiler.googlecode.com/files/compiler-latest.zip
CC_PATH = closure/compiler
CC_JAR = $(CC_PATH)/compiler.jar

# Closure closurebuilder.py arguments.
CC = python $(LIB_PATH)/closure/bin/build/closurebuilder.py \
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
GENERATED_DIR = cidev/generated
OBJ_OUTPUT = $(GENERATED_DIR)/obj.js
SHADER_OUTPUT = $(GENERATED_DIR)/glsl.js

debug: objs shaders
	build/index.py --js `$(CC) --output_mode list` > $(INDEX_OUTPUT)

release: objs shaders
	$(CC) --output_mode compiled > $(JS_OUTPUT)
	build/index.py --js $(JS_OUTPUT) > $(INDEX_OUTPUT)

dry-run:
	$(CC) --output_mode compiled > /dev/null

objs: generated-dir
	build/obj.py > $(OBJ_OUTPUT)

shaders: generated-dir
	build/shaders.py > $(SHADER_OUTPUT)

generated-dir:
	mkdir -p $(GENERATED_DIR)

lint:
	gjslint --exclude_files $(SHADER_OUTPUT),$(OBJ_OUTPUT) \
		--unix_mode -r cidev/

clean:
	rm -f $(JS_OUTPUT) $(INDEX_OUTPUT)
	rm -rf $(GENERATED_DIR)

server:
	python -m SimpleHTTPServer

closure: closure-library closure-compiler

closure-library:
	@test -d $(LIB_PATH)/.git || rm -rf $(LIB_PATH) # Delete any non-git version.
	@test -d $(LIB_PATH) || git clone $(LIB_URL) $(LIB_PATH)
	@cd $(LIB_PATH) && git pull

closure-compiler:
	wget $(CC_URL) -O /tmp/cc.zip
	unzip -o /tmp/cc.zip -d $(CC_PATH)
