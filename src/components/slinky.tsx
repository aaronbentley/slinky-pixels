'use client'
/**
 * SlinkyPixels : Slinky
 *
 * A pixel slinky seen side-on: a helix laid along an arch. Every pixel bobs
 * up and down, its animation offset by its position along the coil, so a
 * wave travels through the spring. Animates a whole `transform` string so
 * Motion runs it on WAAPI (compositor), not per-frame JS.
 *
 * Presets:
 *   - 'home' : full-width background behind the homepage
 *   - 'hero' : compact coil behind sub-page heroes
 *
 * Sizes are in units at the 1440px design width. `--slinky-unit` scales them
 * with the viewport (1px at 1440px, up to 2px) so the coil keeps its shape
 * on wide screens instead of thinning out. Pixels are placed as a % of the
 * coil container's width, which has a minimum so loops don't bunch up on
 * small screens. Render inside an `isolate` parent, it sits at -z-10.
 */
import { cn } from '@/lib/utils'
import { motion, useAnimate, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'

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
        // Full width, but never narrower than 900px
        coil: 'top-[64%] left-1/2 w-[max(100%,900px)] -translate-x-1/2'
    },
    hero: {
        rings: 18,
        perRing: 14,
        radiusX: 18,
        radiusY: 56,
        arch: 150,
        frontSize: 8,
        backSize: 5,
        wave: 16,
        wavesAlong: 1.5,
        // 18 rings × 2.4vw, but never narrower than 480px. Anchored by its
        // right edge, which sits where a 12-ring coil at left-[60%] ended
        coil: 'top-[66%] right-[calc(40%-max(28.8vw,320px))] w-[max(43.2vw,480px)]'
    }
} as const

type Preset = keyof typeof PRESETS

const CYCLE = 6 // s - one full bob

const COLORS = ['var(--primary)', 'var(--secondary)', 'var(--tertiary)']

const buildPixels = (preset: Preset) => {
    const p = PRESETS[preset]

    return Array.from({ length: p.rings * p.perRing + 1 }, (_, k) => {
        const s = k / p.perRing
        const t = ((k % p.perRing) / p.perRing) * Math.PI * 2
        const u = s / p.rings
        const front = Math.cos(t) > 0
        const size = front ? p.frontSize : p.backSize

        return {
            key: k,
            front,
            phase: (u * p.wavesAlong * CYCLE) % CYCLE,
            style: {
                left: `calc(${(u * 100).toFixed(4)}% + ${Math.round(p.radiusX * Math.cos(t))} * var(--slinky-unit))`,
                top: `calc(${Math.round(-p.arch * Math.sin(Math.PI * u) + p.radiusY * Math.sin(t))} * var(--slinky-unit))`,
                width: `calc(${size} * var(--slinky-unit))`,
                height: `calc(${size} * var(--slinky-unit))`,
                background: COLORS[Math.min(2, Math.floor(u * 3))],
                opacity: `calc(var(--slinky-intensity) * ${front ? 1 : 0.4})`
            }
        }
    })
}

// Computed once per preset at module load
const PIXELS = {
    home: buildPixels('home'),
    hero: buildPixels('hero')
}

const Slinky = ({
    preset = 'hero',
    className
}: {
    preset?: Preset
    className?: string
}) => {
    const [scope, animate] = useAnimate<HTMLDivElement>()
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        /**
         * Leave the coil at rest when Reduced Motion is enabled
         */
        if (shouldReduceMotion) return

        const p = PRESETS[preset]

        /**
         * The wave is a % of each pixel's own (unit-scaled) size, so it scales
         * with the coil without CSS variables in the WAAPI keyframes. Front &
         * back pixels differ in size, so animate each depth separately.
         * Negative delays start each pixel part-way through its cycle.
         */
        const controls = (['front', 'back'] as const).map((depth) => {
            const size = depth === 'front' ? p.frontSize : p.backSize
            const wave = `${((p.wave / size) * 100).toFixed(2)}%`
            const phases = PIXELS[preset]
                .filter(({ front }) => front === (depth === 'front'))
                .map(({ phase }) => phase)

            return animate(
                `[data-depth="${depth}"]`,
                {
                    transform: [
                        `translateY(-${wave})`,
                        `translateY(${wave})`,
                        `translateY(-${wave})`
                    ]
                },
                {
                    duration: CYCLE,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: (i) => -phases[i]
                }
            )
        })

        return () => controls.forEach((control) => control.stop())
    }, [animate, preset, shouldReduceMotion])

    return (
        <motion.div
            ref={scope}
            aria-hidden='true'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn(
                'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
                '[--slinky-intensity:0.2] dark:[--slinky-intensity:0.32]',
                '[--slinky-unit:clamp(1px,100vw/1440,2px)]',
                className
            )}>
            <div
                className={cn(
                    'absolute',
                    // 'blur-[calc(3*var(--slinky-unit))]',
                    PRESETS[preset].coil
                )}>
                {PIXELS[preset].map(({ key, front, style }) => (
                    <span
                        key={key}
                        data-depth={front ? 'front' : 'back'}
                        style={style}
                        className='absolute rounded-[calc(2*var(--slinky-unit))]'
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default Slinky
