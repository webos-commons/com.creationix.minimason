var SDL = require('sdl');
var WebGL = require('webgl');

module.exports = function (width, height) {

  SDL.init(SDL.INIT.VIDEO);
  SDL.GL.setAttribute(SDL.GL.DOUBLEBUFFER, 1);

  var screen = SDL.setVideoMode(width, height, 0, SDL.SURFACE.OPENGL | SDL.SURFACE.FULLSCREEN);
  width = screen.w; height = screen.h;
//  SDL.events.on('event', console.dir);
  SDL.events.on('QUIT', function () { process.exit(0); });
  SDL.events.on("KEYDOWN", function (evt) {
    if (evt.sym === 99 && evt.mod === 64) process.exit(0); // Control+C
    if (evt.sym === 27) process.exit(0);  // ESC
  });
  WebGL.viewport(0, 0, screen.w, screen.h);
  var platform = {
    type: "nodeSDL",
    loadTexture: loadTexture,
    setTitle: setTitle,
    setIcon: setIcon,
    width: screen.w,
    height: screen.h,
    flip: SDL.GL.swapBuffers,
    gl: WebGL,
    on: function (name, callback) {
      if (name === "mousemove") name = "MOUSEMOTION";
      SDL.events.on(name, callback);
    },
    requestAnimationFrame: function (callback) {
      setTimeout(callback, 16);
    }
  };

  return platform;
  
  function loadTexture(path, callback) {
    var gl = WebGL;
    try {
      // TODO: Get actual image from SDL and convert it
      var gltexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, gltexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } catch(err) {
      return callback(err);
    }
    callback(null, gltexture);
  }

  function setTitle(title) {
    SDL.WM.setCaption(title, title);
  }

  function setIcon(path) {
    var img = SDL.IMG.load(path)
    SDL.WM.setIcon(img);
  }
};

