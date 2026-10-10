/**
 * SlinkyPixels : Content : Frontpage
 */
import Marker from '@/components/marker'
import RowLink from '@/components/row-link'
import {
    gradientTextClasses,
    headingBaseClasses,
    Typography
} from '@/components/typography'
import {
    padNumber,
    resolveDocumentReferenceURL,
    resolveLinkURL
} from '@/lib/helpers'
import { fadeUp, rise, stagger } from '@/lib/motion'
import { cn } from '@/lib/utils'
import * as motion from 'motion/react-client'
import {
    PortableText,
    PortableTextBlock,
    PortableTextComponents
} from 'next-sanity'

/**
 * Headline serializer - a single inline block with gradient highlights
 */
const headlineComponents: PortableTextComponents = {
    block: {
        normal: ({ children }) => <>{children}</>
    },
    marks: {
        gradient: ({ children }) => (
            <span className={cn('pe-1', gradientTextClasses)}>{children}</span>
        )
    }
}

const Frontpage = ({
    id,
    order,
    eyebrow,
    headline,
    intro,
    buttons,
    showRecentWork,
    recentWorkCount,
    recentWork
}: {
    id: string
    order: number
    eyebrow?: string | null
    headline?: PortableTextBlock[] | null
    intro?: string | null
    buttons?:
        | {
              _key: string
              label: string
              customUrl?: boolean
              destinationRef?:
                  | { _type: string; title: string; slug: { current: string } }
                  | undefined
                  | null
              destinationHref?: string
              blank?: boolean
          }[]
        | null
    showRecentWork?: boolean | null
    recentWorkCount?: number | null
    recentWork?:
        | {
              _id: string
              _type: string
              title: string
              slug: { current: string }
          }[]
        | null
}) => {
    /**
     * Limit recent work to the requested count
     */
    const recentWorkItems =
        showRecentWork !== false && recentWork
            ? recentWork.slice(0, recentWorkCount ?? 5)
            : []

    return (
        <div
            id={id}
            data-order={order}
            className={cn([
                'mx-auto',
                'flex',
                'w-full',
                'max-w-7xl',
                'flex-wrap',
                'items-start',
                'gap-x-24',
                'gap-y-16',
                'px-8',
                'pt-24',
                // With the UI layout's pb-16, gives the design's 96px above the footer
                'pb-8'
            ])}>
            {/* Hero */}
            <motion.section
                initial='hidden'
                animate='show'
                variants={stagger()}
                className='flex min-w-0 flex-[999_1_520px] flex-col gap-7'>
                {eyebrow && (
                    <motion.div variants={fadeUp}>
                        <Typography variant='eyebrow'>{eyebrow}</Typography>
                    </motion.div>
                )}
                {headline && headline.length > 0 && (
                    <motion.h1
                        variants={rise}
                        className={cn([
                            ...headingBaseClasses,
                            'text-[clamp(3rem,7vw,6.5rem)]/[0.95]',
                            'tracking-[-0.06em]',
                            'text-balance'
                        ])}>
                        <PortableText
                            value={headline}
                            components={headlineComponents}
                        />
                    </motion.h1>
                )}
                {intro && (
                    <motion.div variants={fadeUp}>
                        <Typography
                            variant='p'
                            weight='light'
                            className='max-w-[34ch] text-xl/normal'
                            muted>
                            {intro}
                        </Typography>
                    </motion.div>
                )}
            </motion.section>

            {/* Explore */}
            <motion.section
                aria-label='Explore'
                initial='hidden'
                animate='show'
                variants={stagger(0.15)}
                className='flex min-w-0 flex-[1_1_360px] flex-col gap-12'>
                {buttons && buttons.length > 0 && (
                    <motion.nav
                        aria-label='Pages'
                        variants={stagger()}
                        className='flex flex-col border-t border-foreground'>
                        {buttons.map((link, index) => {
                            /**
                             * Destructure link properties
                             */
                            const {
                                _key,
                                blank,
                                customUrl,
                                destinationRef,
                                destinationHref,
                                label
                            } = link

                            /**
                             * Verify link properties
                             */
                            if (
                                !label ||
                                !destinationRef ||
                                (customUrl && !destinationHref)
                            )
                                return null

                            /**
                             * Resolve link item URL
                             */
                            const href = resolveLinkURL({
                                customUrl,
                                destinationRef,
                                destinationHref
                            })

                            return (
                                <motion.div
                                    key={_key}
                                    variants={fadeUp}
                                    className='border-b'>
                                    <RowLink
                                        href={href}
                                        target={blank ? '_blank' : '_self'}
                                        arrow='right'
                                        className='min-h-16 gap-4'>
                                        <span className='w-6 font-mono text-xs text-muted-foreground'>
                                            {padNumber(index + 1)}
                                        </span>
                                        <span className='flex-1 text-2xl/tight font-semibold tracking-tighter'>
                                            {label}
                                        </span>
                                    </RowLink>
                                </motion.div>
                            )
                        })}
                    </motion.nav>
                )}
                {recentWorkItems.length > 0 && (
                    <motion.div
                        variants={stagger()}
                        className='flex flex-col gap-3'>
                        <motion.div variants={fadeUp}>
                            <Typography
                                variant='label'
                                as='h2'>
                                Recent work
                            </Typography>
                        </motion.div>
                        <ul className='flex flex-col'>
                            {recentWorkItems.map((work, index) => (
                                <motion.li
                                    key={work._id}
                                    variants={fadeUp}
                                    className='border-b'>
                                    <RowLink
                                        href={resolveDocumentReferenceURL(
                                            work._type,
                                            work.slug
                                        )}
                                        arrow='up-right'
                                        arrowClassName='size-4'
                                        className='min-h-12 gap-3'>
                                        <Marker index={index} />
                                        <span className='flex-1 text-[15px] font-medium tracking-tight'>
                                            {work.title}
                                        </span>
                                    </RowLink>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </motion.section>
        </div>
    )
}

export default Frontpage
