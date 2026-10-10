'use client'
/**
 * SlinkyPixels : Gradient Shift
 * Gradient text whose gradient gently drifts back & forth. The gradient is
 * one and a half times the width of the text and its position oscillates, so the colours
 * slide across the letters and ease back. Still for Reduced Motion (Motion's
 * `reducedMotion` setting only covers transforms, not background position).
 */
import { gradientTextClasses } from '@/components/typography'
import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'motion/react'

const GradientShift = ({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) => {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.span
            className={cn(
                gradientTextClasses,
                'bg-size-[150%_100%]',
                className
            )}
            style={{ backgroundPosition: '0% 50%' }}
            animate={
                shouldReduceMotion
                    ? undefined
                    : { backgroundPosition: ['0% 50%', '100% 50%'] }
            }
            transition={{
                duration: 6,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror'
            }}>
            {children}
        </motion.span>
    )
}

export default GradientShift
