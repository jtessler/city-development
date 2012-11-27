#!/usr/bin/env python

"""Produces index.html from index.tmpl"""

from string import Template
import argparse
import os.path

def javascript_file(filename):
  if os.path.isfile(filename):
    return "<script type=\"text/javascript\" src=\"%s\"></script>" % filename

parser = argparse.ArgumentParser()
parser.add_argument("--js", nargs="+", type=javascript_file)
arguments = parser.parse_args()
includes = reduce(lambda x, y: x + y, parser.parse_args().js)

index_tmpl = open("tmpl/index.tmpl", "r")
print Template(index_tmpl.read()).substitute(javascript=includes)
index_tmpl.close()
