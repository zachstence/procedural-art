import type { SketchSpec } from "../Sketch.svelte";

export const cube: SketchSpec = {
    draw: (p5): void => {
        p5.background('#262626')
        p5.rotateX(p5.frameCount * 0.002)
        p5.rotateY(p5.frameCount * 0.006)
        p5.rotateZ(p5.frameCount * 0.018)
        p5.box(200, 200, 200)
    },
}
