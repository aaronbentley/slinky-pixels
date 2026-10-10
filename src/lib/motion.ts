/**
 * SlinkyPixels : Motion
 * Shared entrance reveal variants. Containers stagger their children, which
 * fade up into place. Used with `motion/react-client` in server components.
 */

export const stagger = (delayChildren = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren } }
})

export const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' as const }
    }
}

/**
 * For LCP elements (page titles): rises without fading in. Content that
 * starts at opacity 0 doesn't count as painted until it is revealed
 */
export const rise = {
    hidden: { y: 12 },
    show: { y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
}
