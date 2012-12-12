City Development
================

_A web-based 3D city modeling system intended for a high school geometry
project._

Requirements
------------
* Java
* Python
* Subversion
* [Google Closure](https://developers.google.com/closure/) (see below)
* A WebGL-supporting platform and browser

Development Requirements
------------------------
* [Google Closure Linter](https://developers.google.com/closure/utilities/)

Initial Setup
-------------
1. Download the [Google Closure](https://developers.google.com/closure/) library
   and compiler: `make closure`
1. Compile all JavaScript files and HTML templates: `make release`
1. Open `index.html` in any web browser

The Plan and Expected Results
-----------------------------
Students are required to explore area calculations for various polygons
(buildings), tessellation, population density, and other environmental science
issues. This system provides a web-based platform for students to explore the
world they create.

Using a bird’s-eye view, students place various structures, e.g. schools,
houses, power plants, represented as polygons about a 2D grid. For each
building, students may specify the number of floors and, potentially, aesthetic
qualities. Furthermore, initial geography and structure placements are randomly
generated, so no two projects are alike. Every change immediately updates a
3D-rendered version, where students may “fly around” and inspect the
modifications.

Actual Results
--------------
![Screenshot](https://raw.github.com/jtessler/city-development/master/artifact/screenshot01.png)

Students can easily add, modify, and remove various building types from the
scene. Each building type exposes unique modifiers to the user, e.g. the number
of floors on a residential household.

I did not include the bird's-eye view, as I believe the simple UI and 3D view
are sufficient. Moreover, the grid is initially blank, i.e. I did not implement
the randomization component. This better-aligns with the objective of our final
geometry curriculum.

Credits
-------
I borrowed some code snippets from the following sources:
* [Learning WebGL](https://github.com/gpjt/webgl-lessons)
* [WebGL Earth](https://github.com/webglearth/webglearth)
* [OBJ Parser] (http://programminglinuxgames.blogspot.com/2010/09/parsing-wavefront-obj-file-format-using.html)
