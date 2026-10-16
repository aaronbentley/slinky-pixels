'use client'
/**
 * SlinkyPixels : Slinky
 *
 * A pixel slinky seen side-on: a helix laid along an arch, drawn to a canvas.
 * A wave travels along the coil and the coil flexes as it passes:
 *   - the loops bob up & down, with a second, slower wave layered on top so
 *     the motion never quite repeats
 *   - the loops bunch together & spread apart (squash & stretch)
 *   - each loop tilts to stay square to the coil (follows the spine)
 * The brand colours blend across the screen, so pixels shift hue as they
 * move. Every pixel is placed each frame, so the animation pauses off-screen.
 *
 * Presets:
 *   - 'home' : full-width background behind the homepage
 *   - 'hero' : shorter, full-width coil behind sub-page heroes
 *
 * Sizes are in units at the 1440px design width. A unit scales with the
 * viewport (1px at 1440px, up to 2px) so the coil keeps its shape on wide
 * screens instead of thinning out. The coil spans the container's width,
 * but never less than 900px so loops don't bunch up on small screens.
 * Render inside an `isolate` parent, it sits at -z-10.
 */
import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

const PRESETS = {
    home: {
        rings: 22,
        perRing: 16,
        radiusX: 24, // units - horizontal tilt of each loop
        radiusY: 86, // units - loop height
        arch: 260, // units - how high the middle of the slinky lifts
        frontSize: 9, // units - pixels on the front of the coil
        backSize: 6, // units - pixels on the back of the coil
        wave: 22, // units - bob distance either side of rest
        wavesAlong: 1.5, // waves visible along the coil at once
        top: 0.64 // where the ends of the coil sit, down the container
    },
    hero: {
        rings: 40,
        perRing: 14,
        radiusX: 18,
        radiusY: 56,
        arch: 150,
        frontSize: 8,
        backSize: 5,
        wave: 16,
        wavesAlong: 2.5,
        top: 0.66
    }
} as const

type Preset = keyof typeof PRESETS

/**
 * How the coil flexes, tuned in the Slinky Motion Lab playground
 */
const MOTION = {
    cycle: 8.5, // s - one full wave
    squash: 0.7, // loops bunch & spread, 0 - 1 of the most before they cross
    lean: 1, // loops tilt with the coil, 1 = square to it
    layer: 0.7 // height of the second, slower wave, relative to the first
}

const TAU = Math.PI * 2

const COLORS = ['--primary', '--secondary', '--tertiary']

/**
 * Steps in the precomputed gradient, plenty for a smooth blend
 */
const GRADIENT_STEPS = 256

/**
 * oklch(L C h) to [L, a, b] in OKLab, or null if it isn't oklch
 */
const toOklab = (color: string) => {
    const match = color.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/)
    if (!match) return null

    const lightness = parseFloat(match[1]) / (match[2] ? 100 : 1)
    const chroma = parseFloat(match[3])
    const hue = (parseFloat(match[4]) * Math.PI) / 180

    return [lightness, chroma * Math.cos(hue), chroma * Math.sin(hue)]
}

/**
 * The brand colours blended left to right in OKLab, so the midpoints stay
 * vivid. Falls back to hard thirds if a colour isn't oklch
 */
const buildGradient = (colors: string[]) => {
    const stops = colors.map(toOklab)
    const span = colors.length - 1

    return Array.from({ length: GRADIENT_STEPS }, (_, i) => {
        const position = (i / (GRADIENT_STEPS - 1)) * span
        const index = Math.min(span - 1, Math.floor(position))
        const from = stops[index]
        const to = stops[index + 1]

        if (!from || !to) {
            return colors[
                Math.min(span, Math.floor((i / GRADIENT_STEPS) * colors.length))
            ]
        }

        const mix = position - index
        const [l, a, b] = from.map((value, c) => value + (to[c] - value) * mix)

        return `oklab(${l.toFixed(4)} ${a.toFixed(4)} ${b.toFixed(4)})`
    })
}

/**
 * Draw the coil at `time` (s) into a canvas of `width` x `height` CSS px
 */
const drawCoil = ({
    ctx,
    preset,
    width,
    height,
    gradient,
    intensity,
    time
}: {
    ctx: CanvasRenderingContext2D
    preset: Preset
    width: number
    height: number
    gradient: string[]
    intensity: number
    time: number
}) => {
    const p = PRESETS[preset]
    ctx.clearRect(0, 0, width, height)

    const unit = Math.min(2, Math.max(1, window.innerWidth / 1440))
    const coilWidth = Math.max(width, 900)
    const left = (width - coilWidth) / 2
    const baseline = height * p.top
    const { cycle, squash, lean, layer } = MOTION

    /**
     * Largest shift along the coil that never lets neighbouring loops cross
     */
    const squashMax = (0.8 * (coilWidth / unit)) / (TAU * p.wavesAlong)

    /**
     * The coil's centre line at `u` (0 - 1 along it), in px
     */
    const spine = (u: number) => {
        const phase = TAU * (time / cycle + p.wavesAlong * u)
        const bob =
            -p.wave * Math.cos(phase) -
            layer *
                p.wave *
                0.6 *
                Math.cos(
                    TAU * (time / (cycle * 0.63) + 1.7 * p.wavesAlong * u) + 1.3
                )
        const shift = -squash * squashMax * Math.sin(phase)

        return {
            x: left + u * coilWidth + shift * unit,
            y: baseline + (-p.arch * Math.sin(Math.PI * u) + bob) * unit
        }
    }

    /**
     * Back of the coil first, so the front pixels sit on top
     */
    const total = p.rings * p.perRing + 1

    for (const depth of ['back', 'front'] as const) {
        const size = (depth === 'front' ? p.frontSize : p.backSize) * unit
        ctx.globalAlpha = intensity * (depth === 'front' ? 1 : 0.4)

        for (let k = 0; k < total; k++) {
            const t = ((k % p.perRing) / p.perRing) * TAU
            if (Math.cos(t) > 0 !== (depth === 'front')) continue

            const u = k / p.perRing / p.rings
            const centre = spine(u)

            /**
             * Tilt the loop by the coil's slope here
             */
            const before = spine(Math.max(0, u - 0.002))
            const after = spine(Math.min(1, u + 0.002))
            const angle =
                lean * Math.atan2(after.y - before.y, after.x - before.x)
            const loopX = p.radiusX * Math.cos(t) * unit
            const loopY = p.radiusY * Math.sin(t) * unit
            const x =
                centre.x + loopX * Math.cos(angle) - loopY * Math.sin(angle)
            const y =
                centre.y + loopX * Math.sin(angle) + loopY * Math.cos(angle)

            /**
             * Colour by position across the screen, so pixels shift hue as
             * they squash, stretch & lean
             */
            const across = Math.min(1, Math.max(0, (x + size / 2) / width))

            ctx.fillStyle = gradient[Math.round(across * (GRADIENT_STEPS - 1))]
            ctx.beginPath()
            ctx.roundRect(x, y, size, size, 2 * unit)
            ctx.fill()
        }
    }

    ctx.globalAlpha = 1
}

const Slinky = ({
    preset = 'hero',
    className
}: {
    preset?: Preset
    className?: string
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return

        let width = 0
        let height = 0
        let gradient: string[] = []
        let intensity = 0
        let frame = 0

        /**
         * Brand colours & strength come from the theme's CSS variables
         */
        const readTheme = () => {
            const styles = getComputedStyle(canvas)
            gradient = buildGradient(
                COLORS.map((name) => styles.getPropertyValue(name).trim())
            )
            intensity =
                parseFloat(styles.getPropertyValue('--slinky-intensity')) || 0
        }

        const resize = () => {
            const dpr = Math.min(2, window.devicePixelRatio || 1)
            width = canvas.clientWidth
            height = canvas.clientHeight
            canvas.width = Math.round(width * dpr)
            canvas.height = Math.round(height * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const draw = (time: number) =>
            drawCoil({ ctx, preset, width, height, gradient, intensity, time })

        /**
         * Animate only while on screen. With Reduced Motion, draw the coil
         * once at rest & redraw it when its size or theme changes
         */
        const tick = (now: number) => {
            draw(now / 1000)
            frame = requestAnimationFrame(tick)
        }
        const start = () => {
            cancelAnimationFrame(frame)
            if (shouldReduceMotion) draw(0)
            else frame = requestAnimationFrame(tick)
        }
        const stop = () => cancelAnimationFrame(frame)

        readTheme()
        resize()
        start()

        const resizeObserver = new ResizeObserver(() => {
            resize()
            if (shouldReduceMotion) draw(0)
        })
        resizeObserver.observe(canvas)

        const themeObserver = new MutationObserver(() => {
            readTheme()
            if (shouldReduceMotion) draw(0)
        })
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme', 'class']
        })

        const visibilityObserver = new IntersectionObserver(([entry]) =>
            entry.isIntersecting ? start() : stop()
        )
        visibilityObserver.observe(canvas)

        return () => {
            stop()
            resizeObserver.disconnect()
            themeObserver.disconnect()
            visibilityObserver.disconnect()
        }
    }, [preset, shouldReduceMotion])

    return (
        <motion.div
            aria-hidden='true'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn(
                'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
                '[--slinky-intensity:0.2] dark:[--slinky-intensity:0.32]',
                className
            )}>
            <canvas
                ref={canvasRef}
                className='absolute inset-0 size-full'
            />
        </motion.div>
    )
}

export default Slinky
