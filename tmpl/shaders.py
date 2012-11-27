#!/usr/bin/env python

"""Produces shaders.js from all shaders in glsl/"""

import os

print "/* THIS FILE IS AUTOMATICALLY GENERATED */\n"
print "goog.provide(\"cidev.webgl.shaders\");"

def isShader(filename):
  return filename.endswith(".glsl") \
      or filename.endswith(".vert") \
      or filename.endswith(".frag")

for filename in filter(isShader, os.listdir("glsl/")):
  shader = open("glsl/" + filename, "r")
  print "\n/** @type {string} */"
  print "cidev.webgl.shaders[\"%s\"] = \"%s\";" % (filename,
      reduce(lambda x, y: x.strip() + y.strip(), shader.readlines()))
  shader.close()
