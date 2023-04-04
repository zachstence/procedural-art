import { Vector4 } from "three"

export const SIZE = 1
export const EDGE_RADIUS = 0.1
export const VERTEX_RADIUS = 0.2

const p0000 = new Vector4( SIZE / 2,  SIZE / 2,  SIZE / 2,  SIZE / 2)
const p1000 = new Vector4(-SIZE / 2,  SIZE / 2,  SIZE / 2,  SIZE / 2)
const p0100 = new Vector4( SIZE / 2, -SIZE / 2,  SIZE / 2,  SIZE / 2)
const p1100 = new Vector4(-SIZE / 2, -SIZE / 2,  SIZE / 2,  SIZE / 2)
const p0010 = new Vector4( SIZE / 2,  SIZE / 2, -SIZE / 2,  SIZE / 2)
const p1010 = new Vector4(-SIZE / 2,  SIZE / 2, -SIZE / 2,  SIZE / 2)
const p0110 = new Vector4( SIZE / 2, -SIZE / 2, -SIZE / 2,  SIZE / 2)
const p1110 = new Vector4(-SIZE / 2, -SIZE / 2, -SIZE / 2,  SIZE / 2)
const p0001 = new Vector4( SIZE / 2,  SIZE / 2,  SIZE / 2, -SIZE / 2)
const p1001 = new Vector4(-SIZE / 2,  SIZE / 2,  SIZE / 2, -SIZE / 2)
const p0101 = new Vector4( SIZE / 2, -SIZE / 2,  SIZE / 2, -SIZE / 2)
const p1101 = new Vector4(-SIZE / 2, -SIZE / 2,  SIZE / 2, -SIZE / 2)
const p0011 = new Vector4( SIZE / 2,  SIZE / 2, -SIZE / 2, -SIZE / 2)
const p1011 = new Vector4(-SIZE / 2,  SIZE / 2, -SIZE / 2, -SIZE / 2)
const p0111 = new Vector4( SIZE / 2, -SIZE / 2, -SIZE / 2, -SIZE / 2)
const p1111 = new Vector4(-SIZE / 2, -SIZE / 2, -SIZE / 2, -SIZE / 2)

export const points = [
    p0000,
    p1000,
    p0100,
    p1100,
    p0010,
    p1010,
    p0110,
    p1110,
    p0001,
    p1001,
    p0101,
    p1101,
    p0011,
    p1011,
    p0111,
    p1111,
]

export const edges4d = [
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
