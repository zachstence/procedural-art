import type P5 from "p5";

export abstract class Sketch {
    constructor(protected readonly p5: P5) {
        this.p5.setup = this.setup.bind(this)
        this.p5.draw = this.draw.bind(this)
    }

    abstract setup(): void
    abstract draw(): void
}
