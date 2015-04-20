# glsl-hsl2rgb

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

HSL to RGB color conversion in GLSL.

```glsl
#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

...
    //75deg hue, 50% sat, 25% lightness
    vec3 rgb = hsl2rgb(75.0/360.0, 0.5, 0.25);
    gl_FragColor = vec4(rgb, 1.0);

```

Implementation from [flixel-gdx](https://github.com/flixel-gdx/flixel-gdx/blob/master/flixel-core/src/org/flixel/data/shaders/blend/luminosity.glsl). PRs for optimizations welcome. 

## Usage

[![NPM](https://nodei.co/npm/glsl-hsl2rgb.png)](https://www.npmjs.com/package/glsl-hsl2rgb)

#### `vec3 rgb = hsl2rgb(vec3 hsl)`

Takes `hsl` vec3 and returns the `rgb` representation. Floats are expected in the 0.0 to 1.0 range. 

#### `vec3 rgb = hsl2rgb(float h, float s, float l)`

Takes individual `h`, `s`, `l` arguments and returns the `rgb` representation. Exported for convenience.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/glsl-hsl2rgb/blob/master/LICENSE.md) for details.
