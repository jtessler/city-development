# Closure Libary variables.
LIB_URL = http://closure-library.googlecode.com/svn/trunk/
LIB_PATH = closure/library

# Closure Compiler variables.
CC_URL = http://closure-compiler.googlecode.com/files/compiler-latest.zip
CC_JAR = closure/compiler/compiler.jar

# Closure calcdeps variables.
CALCDEPS = $(LIB_PATH)/closure/bin/calcdeps.py \
		--path=$(LIB_PATH) \
		--compiler_jar $(CC_JAR) \
		--output_mode compiled

SOURCES = js/hello.js
OUTPUT = city-development-min.js

all: js/hello.js
	$(CALCDEPS) --input $(SOURCES) > $(OUTPUT)

closure: closure-library closure-compiler

closure-library:
	svn checkout $(LIB_URL) $(LIB_PATH)

closure-compiler:
	wget $(CC_URL) -O /tmp/cc.zip
	unzip -o /tmp/cc.zip -d $(CC_PATH)

clean:
	rm -f $(OUTPUT)
