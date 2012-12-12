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
of floors on a residential household. Camera movement is intuitive and smooth,
responding to both keyboard and mouse events. The rendered scene includes an
cube-based environment map and original models that I designed and texturized in
Blender. The various vertex and fragment shaders employ diffuse and specular
shading to enhance the final product.

I did not include the bird's-eye view, as I believe the simple UI and 3D view
are sufficient. Moreover, the grid is initially blank, i.e. I did not implement
the randomization component. This better-aligns with the objective of our final
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

First, unlike the majority of existing projects, I expose and embrace GLSL
coding rather than abstracting away from it. This provides much more control to
competent graphics programmers, but eliminates most boilerplate code that
litters any raw WebGL application.

For example, compare the code two code snippets below. Each produce the same
textured cube, the first using my library, the second using raw WebGL calls.

```javascript
this.context = new cidev.webgl.Context(canvas);
this.camera = new cidev.webgl.Camera(this.context);
this.modelMatrix = goog.vec.Mat4.createFloat32Identity();
this.shader = new cidev.webgl.shader.DiffuseSpecular(
    this.context, this.camera, this.modelMatrix);
this.texture = new cidev.webgl.texture.Texture2D(this.context, 'texture.jpg');
this.cube = new cidev.webgl.Mesh(this.context, 'cube.obj');

this.simple.activate();
goog.vec.Mat4.makeTranslate(this.matrix, x, y, z);
this.simple.render(this.cube, this.texture);
```

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

Artifacts
---------
You may see all image artifacts [here](https://github.com/jtessler/city-development/tree/master/artifact).
You can make your own [here](http://www.cs.utexas.edu/users/joseph/city-development/)!

Credits
-------
I designed and texturized objects using the following sources:
* [Blender](http://www.blender.org/)
* [CGTexture](http://www.cgtextures.com/)

I borrowed some code snippets from the following sources:
* [Learning WebGL](https://github.com/gpjt/webgl-lessons)
* [WebGL Earth](https://github.com/webglearth/webglearth)
* [OBJ Parser](http://programminglinuxgames.blogspot.com/2010/09/parsing-wavefront-obj-file-format-using.html)
