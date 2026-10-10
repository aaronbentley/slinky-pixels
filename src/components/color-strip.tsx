'use client'
/**
 * SlinkyPixels : Color Strip
 * A row of pixel cells in the brand colours, primary -> secondary -> tertiary.
 *
 * The two seams where the colours meet drift gently back & forth: each cell
 * near a seam has an overlay in the neighbouring colour that fades in as the
 * seam sweeps past it, so one colour grows into the other, then retreats.
 * Only opacity animates (WAAPI, off the main thread), and colours stay as
 * theme tokens so light/dark switching still works.
 */
import { cn } from '@/lib/utils'
import { useAnimate, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'

const CELLS = 48

const COLORS = ['var(--primary)', 'var(--secondary)', 'var(--tertiary)']

const SEAMS = [
    { at: 16, period: 7, phase: 0 }, // primary | secondary
    { at: 32, period: 9, phase: 2.5 } // secondary | tertiary
]

const REACH = 3 // cells - how far a seam sweeps either side
const SAMPLES = 48 // keyframes per cycle, for a smooth sine sweep

/**
 * Overlay opacity keyframes for a cell `depth` cells from a seam (1 = next to
 * it). The seam's position follows a sine wave of ±REACH cells; `direction`
 * is the way it has to move to reach the cell (-1 left, 1 right). The overlay
 * fades in as the seam passes across the cell
 */
const sweepKeyframes = (direction: -1 | 1, depth: number) =>
    Array.from({ length: SAMPLES + 1 }, (_, n) => {
        const offset = REACH * Math.sin((n / SAMPLES) * Math.PI * 2)
        return Math.min(1, Math.max(0, direction * offset - (depth - 1)))
    })

const cells = Array.from({ length: CELLS }, (_, i) => {
    const band = Math.floor((i / CELLS) * 3)

    /**
     * Cells within REACH of a seam get an overlay of the neighbouring colour
     */
    const seamIndex = SEAMS.findIndex(
        ({ at }) => i >= at - REACH && i < at + REACH
    )
    const seam = SEAMS[seamIndex]
    const overlay = seam
        ? i < seam.at
            ? // Left of the seam: the next colour grows in as the seam moves left
              {
                  color: COLORS[band + 1],
                  direction: -1 as const,
                  depth: seam.at - i
              }
            : // Right of the seam: the previous colour grows in as it moves right
              {
                  color: COLORS[band - 1],
                  direction: 1 as const,
                  depth: i - seam.at + 1
              }
        : null

    return {
        key: i,
        background: COLORS[band],
        opacity: (0.5 + 0.5 * Math.abs(Math.sin(i * 0.7))).toFixed(2),
        seamIndex,
        overlay
    }
})

const ColorStrip = ({ className }: { className?: string }) => {
    const [scope, animate] = useAnimate<HTMLDivElement>()
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        /**
         * Keep the seams still when Reduced Motion is enabled
         */
        if (shouldReduceMotion) return

        const controls = cells.flatMap(({ key, seamIndex, overlay }) => {
            const element = scope.current?.querySelector(
                `[data-overlay="${key}"]`
            )
            if (!overlay || !element) return []

            const { period, phase } = SEAMS[seamIndex]

            return [
                animate(
                    element,
                    {
                        opacity: sweepKeyframes(
                            overlay.direction,
                            overlay.depth
                        )
                    },
                    {
                        duration: period,
                        ease: 'linear',
                        repeat: Infinity,
                        delay: -phase
                    }
                )
            ]
        })

        return () => controls.forEach((control) => control.stop())
    }, [animate, scope, shouldReduceMotion])

    return (
        <div
            ref={scope}
            aria-hidden='true'
            className={cn('flex h-1.5', className)}>
            {cells.map(({ key, background, opacity, overlay }) => (
                <span
                    key={key}
                    style={{ background, opacity }}
                    className='relative flex-1'>
                    {overlay && (
                        <span
                            data-overlay={key}
                            style={{ background: overlay.color, opacity: 0 }}
                            className='absolute inset-0'
                        />
                    )}
                </span>
            ))}
        </div>
    )
}

export default ColorStrip
