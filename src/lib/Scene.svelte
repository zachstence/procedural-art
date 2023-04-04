<script lang="ts">
	import { Canvas, OrbitControls, T } from '@threlte/core'
    import { writable } from 'svelte/store';
    import { BufferGeometry, LineBasicMaterial, Vector3 } from 'three';
    import { degToRad } from 'three/src/math/MathUtils';
    
    import { Edge } from './Edge';
    import { SIZE, EDGE_RADIUS, VERTEX_RADIUS, edges4d } from './hypercube'
    import { project4 } from './project4';
    import { rotate4 } from './rotate4';

    const PROJECT_FROM_W = SIZE

    const rotationXZ = writable(0)
    const rotationYW = writable(0)

    $: edges3d = edges4d.map(([v0, v1]) => {
        let r0 = rotate4("xz", degToRad($rotationXZ), v0)
        let r1 = rotate4("xz", degToRad($rotationXZ), v1)

        r0 = rotate4("yw", degToRad($rotationYW), r0)
        r1 = rotate4("yw", degToRad($rotationYW), r1)        

        const p0 = project4(r0, PROJECT_FROM_W)
        const p1 = project4(r1, PROJECT_FROM_W)

        return new Edge(p0, p1)
    })

</script>

<div class="flex flex-col text-white">
    <label>
        Rotation XZ
        <input class="w-96" type="range" min="0" max="360" step="1" bind:value={$rotationXZ} />
        {$rotationXZ}
    </label>
    <label>
        Rotation YW
        <input class="w-96" type="range" min="0" max="360" step="1" bind:value={$rotationYW} />
        {$rotationYW}
    </label>
</div>


<Canvas>
    <T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
        <OrbitControls target={{ y: 0 }} />
    </T.PerspectiveCamera>

    <!-- Axes -->
    <!-- <T.Group>
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
    </T.Group> -->

    <!-- Lighting -->
    <T.DirectionalLight position={[3, 10, 10]} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    <T.Group>
        {#each edges3d as edge}
            <T.Mesh position.x={edge.v0.x} position.y={edge.v0.y} position.z={edge.v0.z}>
                <T.MeshStandardMaterial color="#333333" />
                <T.SphereGeometry args={[VERTEX_RADIUS]} />
            </T.Mesh>

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
