/**
 * @fileoverview Shader load and compile functions.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.webgl.Shader");

goog.require("goog.webgl");

/**
 * Compile given shader code.
 * @param {!cidev.webgl.Context} context WebGL context wrapper.
 * @param {string} code GLSL plain text source.
 * @param {number} type Shader type, e.g. FRAGMENT_SHADER or VERTEX_SHADER.
 * @return {!WebGLShader} Compiled shader.
 */
cidev.webgl.Shader.create = function(context, code, type) {
  var gl = context.gl;
  var shader = gl.createShader(type);

  gl.shaderSource(shader, code);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, goog.webgl.COMPILE_STATUS)) {
    throw Error("shader error: " + gl.getShaderInfoLog(shader));
  } else if (goog.isNull(shader)) {
    throw Error("unknown shader error");
  }

  return shader;
}

/**
 * Compiles a shader from an Element.
 * @param {!cidev.webgl.Context} context WebGL context wrapper.
 * @param {!Element|string} element DOM element containing the shader.
 * @return {!WebGLShader} Compiled WebGL shader.
 */
cidev.webgl.Shader.createFromElement(context, element) {
  var gl = context.gl;
  var shaderScript = goog.dom.getElement(element);
  if (goog.isNull(shaderScript)) {
    throw Error("element does not exist");
  }

  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }

  var type;
  if (shaderScript.type == "x-shader/x-fragment") {
    type = goog.webgl.FRAGMENT_SHADER;
  } else if (shaderScript.type == "x-shader/x-vertex") {
    type = goog.webgl.VERTEX_SHADER;
  } else {
    throw Error("invalid shader type: " + shaderScript.type);
  }

  return cidev.webgl.Shader.create(context, str, type);
}
