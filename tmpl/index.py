#!/usr/bin/env python

"""Produces index.html from index.tmpl"""

from string import Template
import argparse
import os.path

JAVASCRIPT_FORMAT = '<script type="text/javascript" src="{0}"></script>'
def javascript_file(filename):
  if os.path.isfile(filename):
    return JAVASCRIPT_FORMAT.format(filename)

parser = argparse.ArgumentParser()
parser.add_argument("--glsl", nargs="+", type=file)
parser.add_argument("--js", nargs="+", type=javascript_file)
arguments = parser.parse_args()

template_dict = dict()
for glsl in arguments.glsl:
  filename = os.path.basename(glsl.name)
  template_dict[os.path.splitext(filename)[0]] = glsl.read()
template_dict['javascript'] = ""
for js in arguments.js:
  template_dict['javascript'] += js

index_tmpl = open("tmpl/index.tmpl", "r")
index_html = open("index.html", "w")
index_html.write(Template(index_tmpl.read()).substitute(template_dict))
index_html.close()
index_tmpl.close()
