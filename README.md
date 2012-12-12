City Development
================

_A web-based 3D city modeling system intended for a high school geometry
project._

Requirements
------------
* Java
* Python
* Subversion
* [Google Closure][closure] (see below)
* A WebGL-supporting platform and browser

Development Requirements
------------------------
* [Google Closure Linter](https://developers.google.com/closure/utilities/)

Initial Setup
-------------
1. Download the [Google Closure][closure] library and compiler: `make closure`
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
![Screenshot][screenshot]

Students can easily add, modify, and remove various building types from the
scene. Each building type exposes unique modifiers to the user, e.g. the number
of floors on a residential household. Camera movement is intuitive and smooth,
responding to both keyboard and mouse events. The rendered scene includes an
cube-based environment map and original models that I designed and texturized in
Blender. The various vertex and fragment shaders employ diffuse and specular
shading to enhance the final product.

I did not include the bird's-eye view, as I believe the simple UI and 3D view
are sufficient. Moreover, the grid is initially blank, i.e. I did not implement
the randomization component. This better-aligns with the objectives of our final
geometry curriculum.

Unexpected Results
------------------
Although the final product is not terribly advanced (given the high school
student audience), I devoted most of my attention to the architecture,
efficiency, and scalability of the underlying system. This was not my original
intent, but it resulted in an immense amount of WebGL (and therefore OpenGL)
research and exploration.

I believe that I have built the foundation of a new WebGL JavaScript library
that is unique in numerous ways. After all, given the prevalence of WebGL
engines available today, why did I dedicate such effort to an already saturated
area?

The Library: Background and Motivation
--------------------------------------
First, unlike the majority of existing projects, I expose and embrace GLSL
coding rather than abstracting away from it. This provides much more control to
competent graphics programmers, but eliminates most boilerplate code that
litters any raw WebGL application (without hindering any performance).

Second, no other product integrates with the [Google Closure][closure] library.
Not only does this library provide developers the power of Google's framework,
but it provides a familiar environment for any current Closure project to
import. In fact, I hope to polish this project and present it to the Closure
team for possible adoption in the official library.

Third, I designed both a [GLSL][glsl] and [OBJ][obj] compiler. These allow the
developer to design shaders and models externally, e.g. in another IDE or
modeling software like Blender. Futhermore, the compilers minimize the code and
produce JavaScript classes that are easily accessible by the rest of the WebGL
application.

As an example, compare the code two code snippets below. Each produce the same
textured cube, where the first clearly hides the redundant setup code. Notice
the `new cidev.webgl.shader.DiffuseSpecular` call, which initializes the GLSL
shader that was previously compiled and automatically wrapped in a JavaScript
class.

```javascript
this.context = new cidev.webgl.Context(canvas);
this.camera = new cidev.webgl.Camera(this.context);
this.modelMatrix = goog.vec.Mat4.createFloat32Identity();
this.shader = new cidev.webgl.shader.DiffuseSpecular(
    this.context, this.camera, this.modelMatrix);
this.texture = new cidev.webgl.texture.Texture2D(this.context, 'texture.jpg');
this.cube = new cidev.webgl.Mesh(this.context, 'cube.obj');

this.simple.activate();
goog.vec.Mat4.makeTranslate(this.modelMatrix, x, y, z);
this.simple.render(this.cube, this.texture);
```

This snippet produces the same cube with (many) raw WebGL calls.
```javascript
var gl = canvas.getContext("experimental-webgl");
var shaderScript = document.getElementById("shader-vs");
// ... omit ~50 lines compiling shaders ...

var cubeVertexPositionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
vertices = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
// ... omit ~100 lines defining vertex attributes ...

var texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
// ... omit ~50 lines defining properties and importing textures ...

gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
mat4.identity(mvMatrix);
mat4.translate(mvMatrix, [x, y, z]);
gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
    cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
// ... omit ~20 lines finishing shader setup and drawing ...
```

Navigating The Source Code
--------------------------
#### Root Directory Definitions ####
* `artifact` Screenshots of example usage and output.
* `build` The GLSL, OBJ, and index template compilers.
* `cidev` The JavaScript package and WebGL library (see below).
* `css` Cascading Style Sheets for the application.
* `glsl` The raw GLSL vertex and fragment shaders.
* `obj` The raw OBJ files.
* `textures` The images used for all textures.
* `tmpl` Contains the index template file.

#### Javascript Package Directory Definitions ####
* `base.js` The entry point.
* `controller.js` The "controller" component of my MVC design.
* `database.js` A simple in-memory database to store the models.
* `scene.js` Handles all 3D rendering based on user input.
* `view.js` The "view" component of my MVC design.
* `model` The "model" component of my MVC design.
* `testing` Test files used during development.
* `webgl` The WebGL library (see below).

#### WebGL Library Directory Definitions ####
* `camera.js` Handles keyboard/mouse events and wraps the view matrix.
* `context.js` Wraps the canvas and its corresponding WebGL context.
* `mesh.js` The OBJ file wrapper.
* `shader` The GLSL shader wrappers.
* `texture` The WebGL texture wrappers.

Artifacts
---------
You may see all image artifacts [here][artifacts]. You can make your own
[here][utcs]!

Future Work
-----------
I plan to implement more building types and improve the UI's style and
functionality. This requires a deeper study of UV unwrapping and practice in
Blender's modeling environment. However, it will make the lesson more successful
when I implement it in the classroom next spring.

I will continue the library development in hopes of presenting it to the Closure
team for official adoption. Specifically, I want to improve the compilers and
explore ways to improve the development work flow.

Citations
---------
> Yoav I. H. Parish and Pascal Müller. 2001. Procedural modeling of cities. In
> Proceedings of the 28th annual conference on Computer graphics and interactive
> techniques (SIGGRAPH '01). ACM, New York, NY, USA, 301-308.
> DOI=10.1145/383259.383292 http://doi.acm.org/10.1145/383259.383292

I designed and texturized objects using the following sources:
* [Blender](http://www.blender.org/)
* [CGTexture](http://www.cgtextures.com/)

I borrowed some code snippets from the following sources:
* [Learning WebGL](https://github.com/gpjt/webgl-lessons)
* [WebGL Earth](https://github.com/webglearth/webglearth)
* [OBJ Parser](http://programminglinuxgames.blogspot.com/2010/09/parsing-wavefront-obj-file-format-using.html)

[closure]: https://developers.google.com/closure/
[screenshot]: https://raw.github.com/jtessler/city-development/master/artifact/screenshot01.png
[glsl]: https://github.com/jtessler/city-development/blob/master/build/shaders.py
[obj]: https://github.com/jtessler/city-development/blob/master/build/obj.py
[artifacts]: https://github.com/jtessler/city-development/tree/master/artifact
[utcs]: http://www.cs.utexas.edu/users/joseph/city-development/
