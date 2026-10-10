'use client'
/**
 * SlinkyPixels : Motion Provider
 * Honour the user's reduced motion preference for all `motion` components
 */
import { MotionConfig } from 'motion/react'

const MotionProvider = ({ children }: { children: React.ReactNode }) => (
    <MotionConfig reducedMotion='user'>{children}</MotionConfig>
)

export default MotionProvider
