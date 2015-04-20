var test = require('tape')
var Fuzzy = require('test-fuzzy-array')

test('accepts individual H, S, L values', function(t) {
    //get a shader
    var glslify = require('glslify')
    var shader = glslify({
        fragment: './shaders/test-args.frag',
        vertex: './shaders/test.vert'
    })
    run(t, shader)
})

test('converts HSL to RGB in GLSL', function(t) {
    //get a shader
    var glslify = require('glslify')
    var shader = glslify({
        fragment: './shaders/test.frag',
        vertex: './shaders/test.vert'
    })
    run(t, shader)
})

function run(t, shader) {
    //compares input color with output
    var draw = require('gl-shader-output')({
        shader: shader
    })

    //fuzzy compare with vec3 uniform named 'value'
    var almostEqual = Fuzzy(t, 0.01)
    var compare = function(value, expected, msg) {
        var vec3 = draw({ value: value }).slice(0, 3)
        return almostEqual(vec3, expected, msg)
    }

    compare([0.5, 1, 0], rgb(0, 0, 0), 'black')
    compare([0.5, 1, 1], rgb(255, 255, 255), 'white')
    compare([0, 0, 0.58], rgb(147, 147, 147))
    compare([0, 1, 0.5], rgb(255, 0, 0))
    compare([0.0, 1, 0.75], rgb(255, 128, 128))
    compare([0.5, 1, 0.5], rgb(0, 255, 255))
    compare([60/360, 1, 0.5], rgb(255, 255, 0))
    t.end()
}

function rgb(r, g, b) {
    return [r,g,b].map(function(c) {
        return c/255
    })
}