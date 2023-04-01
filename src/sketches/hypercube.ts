import type { SketchSpec } from "../Sketch.svelte";
import * as math from 'mathjs';

type Vector3D = [number, number, number]
type Vector4D = [number, number, number, number]

const SIZE = 400

const p0000: Vector4D = [ SIZE / 2,  SIZE / 2,  SIZE / 2,  SIZE / 2]
const p1000: Vector4D = [-SIZE / 2,  SIZE / 2,  SIZE / 2,  SIZE / 2]
const p0100: Vector4D = [ SIZE / 2, -SIZE / 2,  SIZE / 2,  SIZE / 2]
const p1100: Vector4D = [-SIZE / 2, -SIZE / 2,  SIZE / 2,  SIZE / 2]
const p0010: Vector4D = [ SIZE / 2,  SIZE / 2, -SIZE / 2,  SIZE / 2]
const p1010: Vector4D = [-SIZE / 2,  SIZE / 2, -SIZE / 2,  SIZE / 2]
const p0110: Vector4D = [ SIZE / 2, -SIZE / 2, -SIZE / 2,  SIZE / 2]
const p1110: Vector4D = [-SIZE / 2, -SIZE / 2, -SIZE / 2,  SIZE / 2]
const p0001: Vector4D = [ SIZE / 2,  SIZE / 2,  SIZE / 2, -SIZE / 2]
const p1001: Vector4D = [-SIZE / 2,  SIZE / 2,  SIZE / 2, -SIZE / 2]
const p0101: Vector4D = [ SIZE / 2, -SIZE / 2,  SIZE / 2, -SIZE / 2]
const p1101: Vector4D = [-SIZE / 2, -SIZE / 2,  SIZE / 2, -SIZE / 2]
const p0011: Vector4D = [ SIZE / 2,  SIZE / 2, -SIZE / 2, -SIZE / 2]
const p1011: Vector4D = [-SIZE / 2,  SIZE / 2, -SIZE / 2, -SIZE / 2]
const p0111: Vector4D = [ SIZE / 2, -SIZE / 2, -SIZE / 2, -SIZE / 2]
const p1111: Vector4D = [-SIZE / 2, -SIZE / 2, -SIZE / 2, -SIZE / 2]

const edges = [
    // Cube w=0
    // Square z=0
    [p0000, p1000],
    [p1000, p1100],
    [p1100, p0100],
    [p0100, p0000],

    // Square z=1
    [p0010, p1010],
    [p1010, p1110],
    [p1110, p0110],
    [p0110, p0010],

    // Connect squares along z
    [p0000, p0010],
    [p1000, p1010],
    [p1100, p1110],
    [p0100, p0110],

    // // Cube w=1
    // // Square z=0
    [p0001, p1001],
    [p1001, p1101],
    [p1101, p0101],
    [p0101, p0001],

    // // Square z=1
    [p0011, p1011],
    [p1011, p1111],
    [p1111, p0111],
    [p0111, p0011],

    // // Connect squares along z
    [p0001, p0011],
    [p1001, p1011],
    [p1101, p1111],
    [p0101, p0111],

    // Connect cubes along w
    [p0000, p0001],
    [p1000, p1001],
    [p1100, p1101],
    [p0100, p0101],
    [p0010, p0011],
    [p1010, p1011],
    [p1110, p1111],
    [p0110, p0111],
]

const lightPosW = SIZE

const stereographicProjection = (w: number) => {
    const c = 1 / (lightPosW - w) * SIZE / 2
    return math.matrix([
        [c, 0, 0, 0],
        [0, c, 0, 0],
        [0, 0, c, 0],
    ])
}

const project = (vector: Vector4D): Vector3D => {
    const w = vector[3]
    const out = math.multiply(stereographicProjection(w), vector)
    
    if (out.size()[0] !== 3) throw new Error('Projecting yielded incorrect vector size')
    return out.toArray() as Vector3D
}

export const hypercube: SketchSpec = {
    setup: (p5): void => {
        p5.noLoop()
    },
    draw: (p5): void => {
        p5.background('#262626')

        p5.rotateX(p5.frameCount * 0.001)
        p5.rotateY(p5.frameCount * 0.002)
        p5.rotateZ(p5.frameCount * 0.004)

        edges.forEach(edge => {
            const v0 = project(edge[0])
            const v1 = project(edge[1])
            p5.line(...v0, ...v1)
        })
    },
}

