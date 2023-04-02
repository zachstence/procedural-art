<script lang="ts">
	import { Canvas, OrbitControls, T } from '@threlte/core'
    import { BufferGeometry, LineBasicMaterial, Spherical, Vector3 } from 'three';

    const SIZE = 1
    const EDGE_RADIUS = 0.1
    const VERTEX_RADIUS = 0.2

    const p000 = new Vector3(SIZE / 2, SIZE / 2, SIZE / 2)
    const p001 = new Vector3(SIZE / 2, SIZE / 2, -SIZE / 2)
    const p010 = new Vector3(SIZE / 2, -SIZE / 2, SIZE / 2)
    const p011 = new Vector3(SIZE / 2, -SIZE / 2, -SIZE / 2)
    const p100 = new Vector3(-SIZE / 2, SIZE / 2, SIZE / 2)
    const p101 = new Vector3(-SIZE / 2, SIZE / 2, -SIZE / 2)
    const p110 = new Vector3(-SIZE / 2, -SIZE / 2, SIZE / 2)
    const p111 = new Vector3(-SIZE / 2, -SIZE / 2, -SIZE / 2)

    const points = [p000, p001, p010, p011, p100, p101, p110, p111]

    class Edge {
        readonly midpoint: Vector3
        readonly spherical: Spherical

        constructor(public readonly v0: Vector3, public readonly v1: Vector3) {
            this.midpoint = this.getMidpoint(v0, v1)

            const diff = new Vector3().copy(v0).sub(v1)
            this.spherical = new Spherical().setFromVector3(diff)

            console.log('Edge', { v0, v1, midpoint: this.midpoint, spherical: this.spherical})
        }

        private getMidpoint = (v0: Vector3, v1: Vector3): Vector3 => new Vector3().copy(v0).add(v1).divide(new Vector3(2, 2, 2))
    }

    const edges = [
        new Edge(p000, p001),
        new Edge(p001, p011),
        new Edge(p011, p010),
        new Edge(p010, p000),
        new Edge(p100, p101),
        new Edge(p101, p111),
        new Edge(p111, p110),
        new Edge(p110, p100),
        new Edge(p000, p100),
        new Edge(p001, p101),
        new Edge(p011, p111),
        new Edge(p010, p110),
    ]
</script>


<Canvas>
    <T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
        <OrbitControls target={{ y: 0 }} />
    </T.PerspectiveCamera>

    <!-- Axes -->
    <T.Group>
        <T.Line args={[
            new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(1, 0, 0)]),
            new LineBasicMaterial({ color: 'red' }),
        ]} />
        <T.Line args={[
            new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 1, 0)]),
            new LineBasicMaterial({ color: 'green' }),
        ]} />
        <T.Line args={[
            new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 0, 1)]),
            new LineBasicMaterial({ color: 'blue' }),
        ]} />
    </T.Group>

    <!-- Lighting -->
    <T.DirectionalLight position={[3, 10, 10]} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    
    <T.Group>
        <!-- Cube vertices -->
        {#each points as point}
            <T.Mesh position.x={point.x} position.y={point.y} position.z={point.z}>
                <T.MeshStandardMaterial color="#333333" />
                <T.SphereGeometry args={[VERTEX_RADIUS]} />
            </T.Mesh>
        {/each}

        <!-- Cube edges -->
        {#each edges as edge}
            <T.Mesh
                position.x={edge.midpoint.x}
                position.y={edge.midpoint.y}
                position.z={edge.midpoint.z}
                rotation.x={edge.spherical.phi}
                rotation.z={edge.spherical.theta}
            >
                <T.MeshStandardMaterial color="#333333" />

                <T.CylinderGeometry args={[EDGE_RADIUS, EDGE_RADIUS, SIZE]} />
            </T.Mesh>
        {/each}
    </T.Group>
</Canvas>


<style>
</style>