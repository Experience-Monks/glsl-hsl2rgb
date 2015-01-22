//Should split this into its own module. 
var create = require('webgl-context')
var getPixels = require('canvas-pixels').get3d
var triangle = require('a-big-triangle')
var xtend = require('xtend')

module.exports = function(opt) {
    opt = xtend(opt, { width: 1, height: 1 })
    var gl = opt.gl || create(opt)
    var shader = typeof opt.shader === 'function'
            ? opt.shader(gl)
            : opt.shader

    function process(value) {        
        shader.bind()
        shader.uniforms.value = value
        triangle(gl)

        var pixels = Array.prototype.slice.call(getPixels(gl))
        return pixels.map(function(p) {
            return p / 255
        }).slice(0, value.length)
    }

    //Checks if value is nearly equal to expected, with 
    //a large epsilon
    process.test = function nearly(t, value, expected, msg) {
        value = process(value||[])
        expected = expected||[]

        if (value.length !== expected.length)
            return t.deepEqual(value, expected, msg)

        var all = value.every(function(a, i) {
            var b = expected[i]
            return Math.abs(a-b) < 0.01
        })
        if (all) t.ok(true, msg)
        else t.deepEqual(value, expected, msg)
    }
    
    return process
}
