# Closure Library variables.
LIB_URL = http://closure-library.googlecode.com/svn/trunk/
LIB_PATH = closure/library
LIB_BASE = $(LIB_PATH)/closure/goog/base.js

# Closure Compiler variables.
CC_URL = http://closure-compiler.googlecode.com/files/compiler-latest.zip
CC_PATH = closure/compiler
CC_JAR = $(CC_PATH)/compiler.jar

# Closure calcdeps.py arguments.
CALCDEPS = $(LIB_PATH)/closure/bin/calcdeps.py \
		--path=$(LIB_PATH) \
		--compiler_jar $(CC_JAR) \
		--input $(JS_SOURCES)

JS_SOURCES = js/hello.js
JS_OUTPUT = js/city-development-min.js

TMPL_SOURCE = index.tmpl
TMPL_OUTPUT = index.html

IMPORT_COMPILED = $(patsubst %,<script src="%"></script>,$(JS_OUTPUT))
IMPORT_DEBUG = $(patsubst %,<script src="%"></script>,$(LIB_BASE) $(JS_SOURCES))

all:
	$(CALCDEPS) --output_mode compiled > $(JS_OUTPUT)
	sed 's:$${javascript}:${IMPORT_COMPILED}:' $(TMPL_SOURCE) $(TMPL_OUTPUT)

debug:
	sed 's:$${javascript}:${IMPORT_DEBUG}:' $(TMPL_SOURCE) $(TMPL_OUTPUT)

clean:
	rm -f $(JS_OUTPUT) $(TMPL_OUTPUT)

closure: closure-library closure-compiler

closure-library:
	svn checkout $(LIB_URL) $(LIB_PATH)

closure-compiler:
	wget $(CC_URL) -O /tmp/cc.zip
	unzip -o /tmp/cc.zip -d $(CC_PATH)
