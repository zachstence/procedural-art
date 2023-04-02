import { Matrix4, Vector4 } from "three"

export type Plane4 = "xy" | "xz" | "xw" | "yz" | "yw" | "zw"

export const rotate4 = (plane: Plane4, radians: number, vector: Vector4): Vector4 => {
    const matrix = createRotationMatrix(plane, radians)
    return new Vector4().copy(vector).applyMatrix4(matrix)
}

const createRotationMatrix = (plane: Plane4, radians: number): Matrix4 => {
    // Column major order
    const arr = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]

    const trigLocation = plane.split("").map(c => ["x", "y", "z", "w"].findIndex(_c => _c === c))
    if (trigLocation.includes(-1)) throw new Error(`Failed to create rotation matrix for plane ${plane}, an axis returned -1`)
    if (trigLocation.length !== 2) throw new Error(`Failed to create rotation matrix for plane ${plane}, length not 2`)
    const [t0, t1] = trigLocation

    arr[t0 + t0 * 4] = Math.cos(radians)
    arr[t0 + t1 * 4] = -1 * Math.sin(radians)
    arr[t1 + t0 * 4] = Math.sin(radians)
    arr[t1 + t1 * 4] = Math.cos(radians)

    return new Matrix4().fromArray(arr)

}