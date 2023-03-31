import P5 from "p5";
import { Sketch } from "./Sketch";

export class Circle extends Sketch {
    static create(): P5 {
        return new P5((p5: P5) => new Circle(p5))
    }

    setup() {
        const canvas = this.p5.createCanvas(200, 200)
        canvas.parent('app')
        this.p5.background('white')
    }

    draw() {
        this.p5.circle(100, 100, 20);
    }
}
