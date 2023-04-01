<script lang="ts" context="module">
    export type SketchSpec = {
        setup?: (p5: P5, parent: HTMLElement) => void,
        draw?: (p5: P5) => void,
    };
</script>

<script lang="ts">
    import P5 from "p5";
    import { onMount } from "svelte";

    export let spec: SketchSpec

    let parent: HTMLElement;
    let p5Instance: P5;

    onMount(() => {
        p5Instance = new P5((p5: P5) => {
            p5.setup = () => {
                const canvas = p5.createCanvas(500, 500, "webgl")
                canvas.parent(parent)
            }

            p5.draw = () => spec.draw(p5)
        })
    })
</script>


<div bind:this={parent} />


<style>
    div {
        position: absolute;
        inset: 0;
        width: 100vw;
        height: 100vh;
    }
</style>