goog.require("goog.vec.Mat4");
goog.require("goog.webgl");

var gl;
function initGL(canvas) {
  try {
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
  } catch (e) {
  }
  if (!gl) {
      alert("Could not initialise WebGL, sorry :-(");
  }
}


function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
      return null;
  }

  var str = "";
  var k = shaderScript.firstChild;
  while (k) {
      if (k.nodeType == 3) {
          str += k.textContent;
      }
      k = k.nextSibling;
  }

  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
      shader = gl.createShader(goog.webgl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(goog.webgl.VERTEX_SHADER);
  } else {
      return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, goog.webgl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
  }

  return shader;
}


var shaderProgram;

function initShaders() {
  var fragmentShader = getShader(gl, "shader-frag");
  var vertexShader = getShader(gl, "shader-vert");

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, goog.webgl.LINK_STATUS)) {
      alert("Could not initialise shaders");
  }

  gl.useProgram(shaderProgram);

  shaderProgram.vertexPositionAttribute =
      gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  shaderProgram.pMatrixUniform =
      gl.getUniformLocation(shaderProgram, "uPMatrix");
  shaderProgram.mvMatrixUniform =
      gl.getUniformLocation(shaderProgram, "uMVMatrix");
}

var mvMatrix;
var pMatrix;

function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}



var triangleVertexPositionBuffer;
var squareVertexPositionBuffer;

function initBuffers() {
  triangleVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(goog.webgl.ARRAY_BUFFER, triangleVertexPositionBuffer);
  var vertices = [
       0.0,  1.0,  0.0,
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0
  ];
  gl.bufferData(goog.webgl.ARRAY_BUFFER, new Float32Array(vertices),
      goog.webgl.STATIC_DRAW);
  triangleVertexPositionBuffer.itemSize = 3;
  triangleVertexPositionBuffer.numItems = 3;

  squareVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(goog.webgl.ARRAY_BUFFER, squareVertexPositionBuffer);
  vertices = [
       1.0,  1.0,  0.0,
      -1.0,  1.0,  0.0,
       1.0, -1.0,  0.0,
      -1.0, -1.0,  0.0
  ];
  gl.bufferData(goog.webgl.ARRAY_BUFFER, new Float32Array(vertices),
      goog.webgl.STATIC_DRAW);
  squareVertexPositionBuffer.itemSize = 3;
  squareVertexPositionBuffer.numItems = 4;
}


function drawScene() {
  mvMatrix = goog.vec.Mat4.createFloat32Identity();
  pMatrix = goog.vec.Mat4.createFloat32();

  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(goog.webgl.COLOR_BUFFER_BIT | goog.webgl.DEPTH_BUFFER_BIT);

  goog.vec.Mat4.makePerspective(
      pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

  goog.vec.Mat4.translate(mvMatrix, -1.5, 0.0, -7.0);
  gl.bindBuffer(goog.webgl.ARRAY_BUFFER, triangleVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
      triangleVertexPositionBuffer.itemSize, goog.webgl.FLOAT, false, 0, 0);
  setMatrixUniforms();
  gl.drawArrays(goog.webgl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);


  goog.vec.Mat4.translate(mvMatrix, 3.0, 0.0, 0.0);
  gl.bindBuffer(goog.webgl.ARRAY_BUFFER, squareVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
      squareVertexPositionBuffer.itemSize, goog.webgl.FLOAT, false, 0, 0);
  setMatrixUniforms();
  gl.drawArrays(goog.webgl.TRIANGLE_STRIP, 0,
      squareVertexPositionBuffer.numItems);
}



function webGLStart() {
  var canvas = document.getElementById("canvas");
  initGL(canvas);
  initShaders();
  initBuffers();

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(goog.webgl.DEPTH_TEST);

  drawScene();
}
