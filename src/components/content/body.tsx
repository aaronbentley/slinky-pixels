/**
 * SlinkyPixels : Content : Body
 *
 * Prose in a main column, with an optional side column: an `aside` passed in
 * by the route (e.g. a work item's details), else the block's own `details`.
 * A body with two or more h2s is "sectioned" (e.g. Uses): it's split into
 * numbered sections with an "On this page" contents list as the side column.
 */
import DetailsList, { DetailsListItem } from '@/components/details-list'
import Marker from '@/components/marker'
import RowLink from '@/components/row-link'
import serializer from '@/components/serializer'
import { Typography } from '@/components/typography'
import { padNumber, slugify } from '@/lib/helpers'
import { fadeUp, stagger } from '@/lib/motion'
import { cn } from '@/lib/utils'
import * as motion from 'motion/react-client'
import {
    PortableText,
    PortableTextBlock,
    PortableTextComponentProps,
    PortableTextComponents,
    stegaClean,
    toPlainText
} from 'next-sanity'

type Section = {
    id: string
    title: string
    heading: PortableTextBlock
    intro: PortableTextBlock[]
    items: { heading: PortableTextBlock; blocks: PortableTextBlock[] }[]
}

/**
 * Split blocks into sections at each h2, and items at each h3. Returns null
 * unless there are at least two sections
 */
const getSections = (blocks: PortableTextBlock[]) => {
    const sections: Section[] = []

    for (const block of blocks) {
        const style = stegaClean(block.style)
        const current = sections.at(-1)

        if (style === 'h2') {
            const title = stegaClean(toPlainText([block])).trim()
            sections.push({
                id: slugify(title),
                title,
                heading: block,
                intro: [],
                items: []
            })
        } else if (!current) {
            // Content before the first h2 isn't sectioned
            return null
        } else if (style === 'h3') {
            current.items.push({ heading: block, blocks: [] })
        } else if (current.items.length > 0) {
            current.items.at(-1)!.blocks.push(block)
        } else {
            current.intro.push(block)
        }
    }

    return sections.length >= 2 ? sections : null
}

/**
 * Prose serializer at a given text size. With `lead`, a first normal block
 * is set as the lead paragraph
 */
const prose = ({
    size = 'text-lg/[1.7]',
    lead = false
}: { size?: string; lead?: boolean } = {}) =>
    serializer({
        block: {
            normal: ({ children, index }) =>
                lead && index === 0 ? (
                    <Typography
                        variant='p'
                        className='text-2xl/[1.4] font-semibold tracking-tighter'>
                        {children}
                    </Typography>
                ) : (
                    <Typography
                        variant='p'
                        className={size}>
                        {children}
                    </Typography>
                )
        }
    })

/**
 * Renders a heading block's content inline, keeping marks & stega
 */
const inline: PortableTextComponents = {
    block: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
        <>{children}</>
    )
}

const Body = ({
    id,
    order,
    content,
    details,
    aside
}: {
    id: string
    order: number
    content?: PortableTextBlock[]
    details?: {
        title?: string | null
        items?: DetailsListItem[] | null
    } | null
    /**
     * Side column content from the route, takes precedence over `details`
     */
    aside?: React.ReactNode
}) => {
    /**
     * Bail early if no content
     */
    if (!content || content.length === 0) return null

    const sections = getSections(content)

    const side =
        aside ??
        (details?.items && details.items.length > 0 ? (
            <DetailsList
                title={details.title}
                items={details.items}
            />
        ) : null)

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
                'gap-y-14',
                'px-8'
            ])}>
            {sections ? (
                <>
                    {/* Contents first, so it sits above the sections on phones */}
                    <motion.nav
                        aria-labelledby={`${id}-contents`}
                        initial='hidden'
                        animate='show'
                        variants={stagger(0.15)}
                        className='flex min-w-0 flex-[1_1_260px] flex-col gap-3'>
                        <Typography
                            variant='label'
                            as='h2'
                            id={`${id}-contents`}>
                            On this page
                        </Typography>
                        <ul className='flex flex-col border-t border-foreground'>
                            {sections.map((section, index) => (
                                <motion.li
                                    key={section.heading._key}
                                    variants={fadeUp}
                                    className='border-b'>
                                    <RowLink
                                        href={`#${section.id}`}
                                        className='min-h-12 gap-3 hover:px-4 focus-visible:px-4'>
                                        <Marker index={index} />
                                        <span className='flex-1 text-[15px] font-medium tracking-tight'>
                                            {section.title}
                                        </span>
                                        <span className='font-mono text-xs text-muted-foreground'>
                                            {padNumber(section.items.length)}
                                        </span>
                                    </RowLink>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.nav>
                    <article className='flex max-w-[68ch] min-w-0 flex-[999_1_600px] flex-col gap-16'>
                        {sections.map((section, index) => (
                            <section
                                key={section.heading._key}
                                id={section.id}
                                aria-labelledby={`${section.id}-heading`}
                                className='flex scroll-mt-24 flex-col gap-8'>
                                <div className='flex items-baseline gap-4 border-t border-foreground pt-5'>
                                    <span className='font-mono text-xs text-muted-foreground'>
                                        {padNumber(index + 1)}
                                    </span>
                                    <h2
                                        id={`${section.id}-heading`}
                                        className='text-[2.125rem]/[1.1] font-semibold tracking-tighter'>
                                        <PortableText
                                            value={section.heading}
                                            components={inline}
                                        />
                                    </h2>
                                </div>
                                {section.intro.length > 0 && (
                                    <div className='flex flex-col gap-[1.15em] text-muted-foreground'>
                                        <PortableText
                                            value={section.intro}
                                            components={prose({
                                                size: 'text-[19px]/[1.6]'
                                            })}
                                        />
                                    </div>
                                )}
                                {section.items.map((item) => (
                                    <div
                                        key={item.heading._key}
                                        className='flex flex-col gap-2'>
                                        <h3 className='flex items-center gap-3 text-[1.3125rem]/tight font-semibold tracking-tighter'>
                                            <Marker index={index} />
                                            <span>
                                                <PortableText
                                                    value={item.heading}
                                                    components={inline}
                                                />
                                            </span>
                                        </h3>
                                        <div className='flex flex-col gap-[1.15em] ps-5'>
                                            <PortableText
                                                value={item.blocks}
                                                components={prose({
                                                    size: 'text-[17px]/[1.7]'
                                                })}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </section>
                        ))}
                    </article>
                </>
            ) : (
                <>
                    <article className='flex max-w-[65ch] min-w-0 flex-[999_1_560px] flex-col gap-[1.15em] text-lg'>
                        <PortableText
                            value={content}
                            components={prose({ lead: true })}
                        />
                    </article>
                    {side && (
                        <aside className='min-w-0 flex-[1_1_320px]'>
                            {side}
                        </aside>
                    )}
                </>
            )}
        </div>
    )
}

export default Body
