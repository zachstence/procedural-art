<script>
	import { Canvas, OrbitControls, T } from '@threlte/core'
	import { spring } from 'svelte/motion'

	const scale = spring(1)
</script>


<Canvas>
    <T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
        <OrbitControls target={{ y: 0.5 }} />
    </T.PerspectiveCamera>

    <T.DirectionalLight position={[3, 10, 10]} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    <!-- Cube -->
    <T.Group scale={$scale}>
        <T.Mesh position.y={0.5} castShadow>
            <T.BoxGeometry />
            <T.MeshStandardMaterial color="#333333" />
        </T.Mesh>
    </T.Group>
</Canvas>


<style>
</style>