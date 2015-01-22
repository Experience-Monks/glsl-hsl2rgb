precision mediump float;

uniform vec3 value;

#pragma glslify: hsl2rgb = require(../)

void main() {
    vec3 rgb = hsl2rgb(value);
    gl_FragColor = vec4(rgb, 1.0);
}