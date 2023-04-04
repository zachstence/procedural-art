import { Matrix4, type Matrix, Vector3, type Vector4 } from "three";

export const project4 = (vector: Vector4, projectFromW: number): Vector3 => {
    const matrix = createStereographicProjectionMatrix(vector.w, projectFromW)
    const v4 = vector.copy(vector).applyMatrix4(matrix)
    return new Vector3(v4.x, v4.y, v4.z)
}

const createStereographicProjectionMatrix = (w: number, projectFromW: number): Matrix4 => {
    const c = 1 / (projectFromW - w)
    return new Matrix4().set(
        c, 0, 0, 0,
        0, c, 0, 0,
        0, 0, c, 0,
        0, 0, 0, 0,
    )
}