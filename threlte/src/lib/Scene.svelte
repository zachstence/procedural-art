<script lang="ts">
	import { Canvas, OrbitControls, T } from '@threlte/core'
    import { BoxGeometry, BufferGeometry, EdgesGeometry, LineSegments, Vector3 } from 'three';

    const SIZE = 1

    const p000 = new Vector3(SIZE / 2, SIZE / 2, SIZE / 2)
    const p001 = new Vector3(SIZE / 2, SIZE / 2, -SIZE / 2)
    const p010 = new Vector3(SIZE / 2, -SIZE / 2, SIZE / 2)
    const p011 = new Vector3(SIZE / 2, -SIZE / 2, -SIZE / 2)
    const p100 = new Vector3(-SIZE / 2, SIZE / 2, SIZE / 2)
    const p101 = new Vector3(-SIZE / 2, SIZE / 2, -SIZE / 2)
    const p110 = new Vector3(-SIZE / 2, -SIZE / 2, SIZE / 2)
    const p111 = new Vector3(-SIZE / 2, -SIZE / 2, -SIZE / 2)

    const edges = [
        [p000, p001],
        [p001, p011],
        [p011, p010],
        [p010, p000],
        [p100, p101],
        [p101, p111],
        [p111, p110],
        [p110, p100],
        [p000, p100],
        [p001, p101],
        [p011, p111],
        [p010, p110],
    ]
</script>


<Canvas>
    <T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
        <OrbitControls target={{ y: 0.5 }} />
    </T.PerspectiveCamera>

    <T.DirectionalLight position={[3, 10, 10]} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    <T.Mesh position.y={0.5} castShadow>
        <T.MeshStandardMaterial color="#333333" />

        {#each edges as edge}
            <T.Line args={[new BufferGeometry().setFromPoints(edge)]}/>
        {/each}
    </T.Mesh>
</Canvas>


<style>
</style>