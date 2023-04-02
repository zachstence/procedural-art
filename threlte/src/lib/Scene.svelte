<script lang="ts">
	import { Canvas, OrbitControls, T } from '@threlte/core'
    import { BufferGeometry, LineBasicMaterial, Vector3 } from 'three';
    
    import { Edge } from './Edge';
    import { SIZE, EDGE_RADIUS, VERTEX_RADIUS, points, edges4d } from './hypercube'
    import { project4 } from './project4';

    const PROJECT_FROM_W = SIZE

    const edges3d = edges4d.map(([v0, v1]) => {
        return new Edge(
            project4(v0, PROJECT_FROM_W),
            project4(v1, PROJECT_FROM_W),
        )
    })
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
        {#each edges3d as edge}
            <T.Mesh
                position.x={edge.midpoint.x}
                position.y={edge.midpoint.y}
                position.z={edge.midpoint.z}
                rotation.y={Math.PI / 2 + edge.spherical.theta}
                rotation.z={edge.spherical.phi}    
            >
                <T.MeshStandardMaterial color="#333333" />
                <T.CylinderGeometry args={[EDGE_RADIUS, EDGE_RADIUS, edge.length]} />
            </T.Mesh>
        {/each}
    </T.Group>
</Canvas>


<style>
</style>