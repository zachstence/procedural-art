<script lang="ts">
    import { Canvas, OrbitControls, T } from '@threlte/core'
  import { writable } from 'svelte/store';
    import { BufferGeometry, DoubleSide, LineBasicMaterial, MeshStandardMaterial, Points, QuadraticBezierCurve3, TorusKnotGeometry, TubeGeometry, Vector3 } from 'three';

    const TUNNEL_RADIUS = 0.5

    const wireframeMaterial = new MeshStandardMaterial({ side: DoubleSide, wireframe: true })

    const curve = new QuadraticBezierCurve3(
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 10),
        new Vector3(2, 2, 10),
    )

    const tubeGeometry = new TubeGeometry(curve, 15, TUNNEL_RADIUS, 50, false)

    const curvePos = writable(0)
    $: cameraPos = curve.getPointAt($curvePos)
    $: cameraTarget = curve.getPoint($curvePos + 0.1)
</script>


<div class="flex flex-col text-white">
    <label>
        Curve Position
        <input class="w-96" type="range" min="0" max="1" step="0.01" bind:value={$curvePos} />
        {$curvePos}
    </label>
</div>


<Canvas>
    <T.PerspectiveCamera makeDefault position={[cameraPos.x, cameraPos.y, cameraPos.z]} fov={24}>
        <OrbitControls target={{ x: cameraTarget.x, y: cameraTarget.y, z: cameraTarget.z}} />
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

    <T.AmbientLight intensity={1} />

    <T.Mesh args={[tubeGeometry, wireframeMaterial]} />
</Canvas>
