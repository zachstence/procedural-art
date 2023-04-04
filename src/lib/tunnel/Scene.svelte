<script lang="ts">
    import { Canvas, OrbitControls, T } from '@threlte/core'
  import { BufferGeometry, EllipseCurve, LineBasicMaterial, QuadraticBezierCurve3, TubeGeometry, Vector3 } from 'three';

    const curve = new QuadraticBezierCurve3(
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 10),
        new Vector3(2, 2, 10),
    )

    const tubeGeometry = new TubeGeometry(curve, 15, 0.5)
</script>


<Canvas>
    <T.PerspectiveCamera makeDefault position={[0, 0, 0]} fov={24}>
        <OrbitControls target={{ x: 0, y: 0, z: 1 }} />
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

    <T.Mesh>
        <T.MeshStandardMaterial color="#333" />
        <T.Line args={[tubeGeometry]} />
    </T.Mesh>
</Canvas>