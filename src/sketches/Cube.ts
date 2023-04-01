import P5 from "p5";
import { Sketch } from "./Sketch";

export class Cube extends Sketch {
    static create(): P5 {
        return new P5((p5: P5) => new Cube(p5))
    }

    setup() {
        const canvas = this.p5.createCanvas(200, 200, "webgl")
        canvas.parent('app')
    }

    draw() {
        this.p5.background('white')

        this.p5.rotateX(this.p5.frameCount * 0.001)
        this.p5.rotateY(this.p5.frameCount * 0.003)
        this.p5.rotateZ(this.p5.frameCount * 0.009)
        this.p5.box(50, 50, 50)
    }
}

Cube.create()