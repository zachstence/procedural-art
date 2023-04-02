import type P5 from "p5";
import * as math from "mathjs";

import type { SketchSpec } from "../Sketch.svelte";

type Vector3D = [number, number, number]

const SIZE = 300

const p000: Vector3D = [SIZE / 2, SIZE / 2, SIZE / 2]
const p001: Vector3D = [SIZE / 2, SIZE / 2, -SIZE / 2]
const p010: Vector3D = [SIZE / 2, -SIZE / 2, SIZE / 2]
const p011: Vector3D = [SIZE / 2, -SIZE / 2, -SIZE / 2]
const p100: Vector3D = [-SIZE / 2, SIZE / 2, SIZE / 2]
const p101: Vector3D = [-SIZE / 2, SIZE / 2, -SIZE / 2]
const p110: Vector3D = [-SIZE / 2, -SIZE / 2, SIZE / 2]
const p111: Vector3D = [-SIZE / 2, -SIZE / 2, -SIZE / 2]

export const cubeWithCylinderEdges: SketchSpec = {
    draw: p5 => {
        p5.background('#262626')
        p5.fill('#888')

        p5.noStroke()
        p5.lights()

        p5.rotateX(p5.frameCount * 0.002)
        p5.rotateY(p5.frameCount * 0.006)
        p5.rotateZ(p5.frameCount * 0.018)

        cylindricalLine(p5, p000, p001, 10, 20)
        cylindricalLine(p5, p001, p011, 10, 20)
        cylindricalLine(p5, p011, p010, 10, 20)
        cylindricalLine(p5, p010, p000, 10, 20)

        cylindricalLine(p5, p100, p101, 10, 20)
        cylindricalLine(p5, p101, p111, 10, 20)
        cylindricalLine(p5, p111, p110, 10, 20)
        cylindricalLine(p5, p110, p100, 10, 20)

        cylindricalLine(p5, p000, p100, 10, 20)
        cylindricalLine(p5, p001, p101, 10, 20)
        cylindricalLine(p5, p011, p111, 10, 20)
        cylindricalLine(p5, p010, p110, 10, 20)
    },
}

const midpoint = (p0: Vector3D, p1: Vector3D): Vector3D => [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2, (p0[2] + p1[2]) / 2]

const cylindricalLine = (p5: P5, p0: Vector3D, p1: Vector3D, edgeRadius: number, pointRadius: number): void => {
    const m = midpoint(p0, p1)
    const diff = math.subtract(p0, p1)
    const length = math.norm(diff) as number

    const { theta, phi } = cartesianToSpherical(diff)

    // Cylinder
    p5.push()
    p5.translate(...m)
    p5.rotateY(-theta)
    p5.rotateZ(-phi)
    p5.cylinder(edgeRadius, length)
    p5.pop()

    // Sphere endpoints
    p5.push()
    p5.translate(...p0)
    p5.sphere(pointRadius)
    p5.pop()
    p5.push()
    p5.translate(...p1)
    p5.sphere(pointRadius)
    p5.pop()
}

interface SphericalCoordinates {
    r: number
    theta: number
    phi: number
}
const cartesianToSpherical = (point: Vector3D): SphericalCoordinates => {
    const [x, y, z] = point
    const r = math.norm(point) as number

    let theta: number;
    if (x === 0) theta = z > 0 ? Math.PI / 2 : -Math.PI / 2
    else theta = math.atan(z / x)

    let phi: number;
    const xzMag = math.norm([x, z]) as number
    if (y === 0) phi = xzMag > 0 ? Math.PI / 2 : -Math.PI / 2
    else {
        phi = math.atan(xzMag / y)
        if (x < 0) phi *= -1
    }

    return { r, theta, phi }
}