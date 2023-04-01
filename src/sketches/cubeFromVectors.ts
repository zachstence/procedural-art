import type { SketchSpec } from "../Sketch.svelte";

type Point = [number, number, number]

const SIZE = 100

const p000: Point = [SIZE / 2, SIZE / 2, SIZE / 2]
const p001: Point = [SIZE / 2, SIZE / 2, -SIZE / 2]
const p010: Point = [SIZE / 2, -SIZE / 2, SIZE / 2]
const p011: Point = [SIZE / 2, -SIZE / 2, -SIZE / 2]
const p100: Point = [-SIZE / 2, SIZE / 2, SIZE / 2]
const p101: Point = [-SIZE / 2, SIZE / 2, -SIZE / 2]
const p110: Point = [-SIZE / 2, -SIZE / 2, SIZE / 2]
const p111: Point = [-SIZE / 2, -SIZE / 2, -SIZE / 2]

export const cubeFromVectors: SketchSpec = {
    draw: (p5): void => {
        p5.background('#262626')

        p5.rotateX(p5.frameCount * 0.002)
        p5.rotateY(p5.frameCount * 0.006)
        p5.rotateZ(p5.frameCount * 0.018)

        p5.line(...p000, ...p001)
        p5.line(...p001, ...p011)
        p5.line(...p011, ...p010)
        p5.line(...p010, ...p000)

        p5.line(...p100, ...p101)
        p5.line(...p101, ...p111)
        p5.line(...p111, ...p110)
        p5.line(...p110, ...p100)

        p5.line(...p000, ...p100)
        p5.line(...p001, ...p101)
        p5.line(...p011, ...p111)
        p5.line(...p010, ...p110)
    },
}
