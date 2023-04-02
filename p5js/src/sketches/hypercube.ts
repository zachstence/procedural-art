import type { SketchSpec } from "../Sketch.svelte";
import * as math from 'mathjs';
import type P5 from "p5";

type Vector3D = [number, number, number]
type Vector4D = [number, number, number, number]
type Plane4D = "xy" | "xz" | "xw" | "yz" | "yw" | "zw"

const SIZE = 300

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
    [p0100, p0101],
    [p0010, p0011],
    [p0110, p0111],


    [p1000, p1001],
    [p1100, p1101],
    [p1110, p1111],
    [p1010, p1011],
]

const lightPosW = SIZE

const createStereographicProjectionMatrix = (w: number) => {
    const c = 1 / (lightPosW - w) * SIZE / 2
    return math.matrix([
        [c, 0, 0, 0],
        [0, c, 0, 0],
        [0, 0, c, 0],
    ])
}

const project = (vector: Vector4D): Vector3D => {
    const w = vector[3]
    const matrix = createStereographicProjectionMatrix(w)
    const out = math.multiply(matrix, vector)
    
    if (out.size()[0] !== 3) throw new Error('Projecting yielded incorrect vector size')
    return out.toArray() as Vector3D
}

const createRotationMatrix = (plane: Plane4D, angle: number): math.Matrix => {
    const out = math.matrix(math.identity(4) as math.Matrix)

    const trigLocation = plane.split("").map(c => ["x", "y", "z", "w"].findIndex(_c => _c === c))
    if (trigLocation.includes(-1)) throw new Error(`Failed to create rotation matrix for plane ${plane}, an axis returned -1`)
    if (trigLocation.length !== 2) throw new Error(`Failed to create rotation matrix for plane ${plane}, length not 2`)
    const [t0, t1] = trigLocation

    out.set([t0, t0], math.cos(angle))
    out.set([t0, t1], -1 * math.sin(angle))
    out.set([t1, t0], math.sin(angle))
    out.set([t1, t1], math.cos(angle))

    return out
}

const rotate = (plane: Plane4D, angle: number, vector: Vector4D): Vector4D => {
    const rotationMatrix = createRotationMatrix(plane, angle)
    const out = math.multiply(rotationMatrix, vector)
    if (out.size()[0] !== 4) throw new Error('Rotating yielded incorrect vector size')
    return out.toArray() as Vector4D
}

/** Animation loop duration in sec */
const PERIOD = 5
const TARGET_FPS = 60
const TOTAL_FRAMES = PERIOD * TARGET_FPS

export const hypercube: SketchSpec = {
    // capture: true,
    captureOptions: {
        name: 'hypercube-webm',
        fps: TARGET_FPS,
        numFrames: TOTAL_FRAMES,
    },
    setup: p5 => {
        p5.frameRate(TARGET_FPS)
    },
    draw: (p5): void => {
        p5.background('#262626')
        p5.noStroke()
        p5.lights()

        edges.forEach(edge => {
            const [e0, e1] = edge

            let r0 = e0
            let r1 = e1
            
            const percent = (p5.frameCount / TOTAL_FRAMES) % 1
            const angle = percent * (Math.PI / 2)

            r0 = rotate("xz", angle, r0)
            r1 = rotate("xz", angle, r1)
            
            r0 = rotate("yw", angle, r0)
            r1 = rotate("yw", angle, r1)

            const v0 = project(r0)
            const v1 = project(r1)

            cylindricalLine(p5, v0, v1, 10, 20)
        })
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