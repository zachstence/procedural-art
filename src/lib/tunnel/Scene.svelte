<script lang="ts">
    import { Canvas, OrbitControls, T } from '@threlte/core'
  import { writable } from 'svelte/store';
    import { BufferGeometry, DoubleSide, LineBasicMaterial, MeshStandardMaterial, Plane, PlaneHelper, Points, QuadraticBezierCurve3, SphereGeometry, TorusKnotGeometry, TubeGeometry, Vector2, Vector3, WireframeGeometry } from 'three';

    const TUNNEL_RADIUS = 0.5

    const wireframeMaterial = new MeshStandardMaterial({ side: DoubleSide, wireframe: true })

    const curve = new QuadraticBezierCurve3(
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 10),
        new Vector3(2, 2, 10),
    )

    const tubeGeometry = new TubeGeometry(curve, 10, TUNNEL_RADIUS, 10, false)

    const pos = writable(0.5)
    $: posVector = curve.getPointAt($pos)
    $: tangentVector = curve.getTangentAt($pos)
    $: circlePlane = new Plane(new Vector3().copy(tangentVector).add(posVector))

    $: console.log({tangentVector, circlePlane})
</script>


<input class="w-96" type="range" min="0" max="1" step="0.01" bind:value={$pos} />


<Canvas>
    <T.PerspectiveCamera makeDefault position={[0, 0, 0]} fov={24}>
        <OrbitControls target={{ x: 0, y: 0, z: 1 }} />
    </T.PerspectiveCamera>

    <T.AmbientLight intensity={1} />

    <T.Mesh args={[tubeGeometry, wireframeMaterial]} />

    <T.Line args={[new BufferGeometry().setFromPoints(curve.getPoints(20)), new LineBasicMaterial({ color: "white" })]} />

    <T.Group position.x={posVector.x} position.y={posVector.y} position.z={posVector.z}>
        <T.PlaneHelper args={[circlePlane]} />
    </T.Group>
</Canvas>
