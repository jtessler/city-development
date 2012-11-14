# Closure Library variables.
LIB_URL = http://closure-library.googlecode.com/svn/trunk/
LIB_PATH = closure/library

# Closure Compiler variables.
CC_URL = http://closure-compiler.googlecode.com/files/compiler-latest.zip
CC_PATH = closure/compiler
CC_JAR = $(CC_PATH)/compiler.jar

# Closure calcdeps.py arguments.
CALCDEPS = $(LIB_PATH)/closure/bin/calcdeps.py \
		--path=$(LIB_PATH) \
		--compiler_jar $(CC_JAR) \
		--input $(SOURCES)

SOURCES = js/hello.js
OUTPUT = js/city-development-min.js

js:
	$(CALCDEPS) --output_mode compiled > $(OUTPUT)

clean:
	rm -f $(OUTPUT)

closure: closure-library closure-compiler

closure-library:
	svn checkout $(LIB_URL) $(LIB_PATH)

closure-compiler:
	wget $(CC_URL) -O /tmp/cc.zip
	unzip -o /tmp/cc.zip -d $(CC_PATH)
