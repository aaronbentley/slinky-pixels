/**
 * SlinkyPixels : Page Hero
 * Shared sub-page heading: an eyebrow (or breadcrumb), the gradient title,
 * the subtitle & optional actions, with the compact slinky behind it.
 */
import Slinky from '@/components/slinky'
import {
    gradientTextClasses,
    headingBaseClasses,
    Typography
} from '@/components/typography'
import { fadeUp, rise, stagger } from '@/lib/motion'
import { cn } from '@/lib/utils'
import * as motion from 'motion/react-client'

const PageHero = ({
    eyebrow,
    title,
    subtitle,
    actions,
    bordered = true
}: {
    eyebrow?: React.ReactNode
    title: string
    subtitle?: string | null
    actions?: React.ReactNode
    /**
     * Pages followed by a cover image drop the border & tighten the bottom
     */
    bordered?: boolean
}) => (
    <section className={cn('relative isolate w-full', bordered && 'border-b')}>
        <Slinky preset='hero' />
        <motion.div
            initial='hidden'
            animate='show'
            variants={stagger()}
            className={cn(
                'mx-auto flex w-full max-w-7xl flex-col gap-5 px-8 pt-22',
                bordered ? 'pb-18' : 'pb-14'
            )}>
            {eyebrow && (
                <motion.div variants={fadeUp}>
                    <Typography
                        variant='eyebrow'
                        as='div'>
                        {eyebrow}
                    </Typography>
                </motion.div>
            )}
            <motion.h1
                variants={rise}
                className={cn(
                    headingBaseClasses,
                    gradientTextClasses,
                    // Shrink to the text so short titles still show all three colours,
                    // padded so bg-clip-text doesn't clip descenders & the last letter
                    'self-start pe-1.5 pb-2',
                    'text-[clamp(3rem,6vw,5.5rem)]/[0.95] tracking-[-0.06em]'
                )}>
                {title}
            </motion.h1>
            {subtitle && (
                <motion.div variants={fadeUp}>
                    <Typography
                        variant='p'
                        weight='light'
                        muted
                        className='max-w-[42ch] text-[22px]/[1.45] tracking-tight'>
                        {subtitle}
                    </Typography>
                </motion.div>
            )}
            {actions && (
                <motion.div
                    variants={fadeUp}
                    className='mt-2 flex flex-wrap gap-3'>
                    {actions}
                </motion.div>
            )}
        </motion.div>
    </section>
)

export default PageHero
