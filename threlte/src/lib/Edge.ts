import { Vector3, Spherical } from "three"
import { radToDeg } from "three/src/math/MathUtils"

export class Edge {
    readonly midpoint: Vector3
    readonly spherical: Spherical
    readonly length: number

    constructor(public readonly v0: Vector3, public readonly v1: Vector3) {
        this.midpoint = this.getMidpoint(v0, v1)

        const diff = new Vector3().copy(v0).sub(v1)
        this.spherical = new Spherical().setFromVector3(diff)

        console.log({
            theta: radToDeg(this.spherical.theta),
            phi: radToDeg(this.spherical.phi),
        })

        this.length = diff.length()
    }

    private getMidpoint = (v0: Vector3, v1: Vector3): Vector3 => new Vector3().copy(v0).add(v1).divide(new Vector3(2, 2, 2))
}
