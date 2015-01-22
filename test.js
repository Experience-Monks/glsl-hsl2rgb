var test = require('tape')

//get a shader
var glslify = require('glslify')
var createShader = glslify({
    fragment: './shaders/test.frag',
    vertex: './shaders/test.vert'
})

//compares input color with output
var compare = require('./test-shader')({
    shader: createShader
}).test

test('converts HSL to RGB in GLSL', function(t) {
    compare(t, [0.5, 1, 0], rgb(0, 0, 0), 'black')
    compare(t, [0.5, 1, 1], rgb(255, 255, 255), 'white')
    compare(t, [0, 0, 0.58], rgb(147, 147, 147))
    compare(t, [0, 1, 0.5], rgb(255, 0, 0))
    compare(t, [0.0, 1, 0.75], rgb(255, 128, 128))
    compare(t, [0.5, 1, 0.5], rgb(0, 255, 255))
    compare(t, [60/360, 1, 0.5], rgb(255, 255, 0))
    t.end()
})

function rgb(r, g, b) {
    return [r,g,b].map(function(c) {
        return c/255
    })
}
