<script lang="ts" context="module">
    export interface CaptureOptions extends Omit<CanvasCapture.GIF_OPTIONS, 'format'> {
        numFrames: number
    }

    export type SketchSpec = {
        capture?: boolean
        captureOptions?: CaptureOptions
        setup?: (p5: P5, parent: HTMLElement) => void,
        draw?: (p5: P5) => void,
    };
</script>

<script lang="ts">
    import P5 from "p5";
    import { onMount } from "svelte";

    import { CanvasCapture } from "canvas-capture"

    export let spec: SketchSpec

    let parent: HTMLElement;
    let p5Instance: P5;
    let capture: CanvasCapture.ACTIVE_CAPTURE | undefined

    onMount(() => {
        p5Instance = new P5((p5: P5) => {
            p5.setup = () => {
                const canvas = p5.createCanvas(parent.clientWidth, parent.clientHeight, "webgl")
                canvas.parent(parent)

                if (spec.capture) {
                    const canvasElm = parent.querySelector('canvas')
                    CanvasCapture.init(canvasElm, { verbose: true })
                }
            }

            p5.draw = () => {
                if (spec.capture) {
                    if (p5.frameCount === 1) {
                        capture = CanvasCapture.beginGIFRecord({
                            onError: error => console.error(`Error recording GIF`, error),
                            onExportProgress: progress => console.debug(`GIF export progress: ${progress}`),
                            onExportFinish: () => console.log(`GIF export complete!`),
                            ...spec.captureOptions,
                        })
                    }

                    if (capture && p5.frameCount > spec.captureOptions.numFrames) {
                        CanvasCapture.stopRecord(capture)
                        capture = undefined
                    }
                }

                p5.orbitControl(2, 2, 0.1)

                spec.draw(p5)
                
                // Draw axes for debugging
                // p5.push()
                // p5.stroke('red')
                // p5.line(0, 0, 0, 100, 0, 0)
                // p5.stroke('green')
                // p5.line(0, 0, 0, 0, 100, 0)
                // p5.stroke('blue')
                // p5.line(0, 0, 0, 0, 0, 100)
                // p5.pop()

                CanvasCapture.checkHotkeys()
                if (CanvasCapture.isRecording()) CanvasCapture.recordFrame()
            }
        })
    })
</script>


<svelte:window on:resize={(event) => { 
    p5Instance.resizeCanvas(event.currentTarget.innerWidth, event.currentTarget.innerHeight)
}} />

<div bind:this={parent} class="absolute inset-0" />
