/**
 * SlinkyPixels : Details List
 * A labelled definition list, e.g. "At a glance" on About or "Project" on
 * work items. Each row's value is text, tags or any other node.
 */
import Marker from '@/components/marker'
import Tags from '@/components/tags'
import { Typography } from '@/components/typography'
import { fadeUp, stagger } from '@/lib/motion'
import { cn } from '@/lib/utils'
import * as motion from 'motion/react-client'
import { useId } from 'react'

export type DetailsListItem = {
    _key: string
    label: string
    text?: React.ReactNode
    tags?: string[] | null
}

const DetailsList = ({
    title,
    items,
    className
}: {
    title?: string | null
    items?: DetailsListItem[] | null
    className?: string
}) => {
    const headingId = useId()

    /**
     * Bail if no items
     */
    if (!items || items.length === 0) return null

    return (
        <motion.section
            aria-labelledby={title ? headingId : undefined}
            initial='hidden'
            animate='show'
            variants={stagger(0.15)}
            className={cn('flex flex-col gap-3', className)}>
            {title && (
                <Typography
                    variant='label'
                    as='h2'
                    id={headingId}>
                    {title}
                </Typography>
            )}
            <dl className='flex flex-col border-t border-foreground'>
                {items.map(({ _key, label, text, tags }, index) => (
                    <motion.div
                        key={_key}
                        variants={fadeUp}
                        className='flex flex-col gap-2 border-b px-1 py-4'>
                        <dt className='flex items-center gap-2.5 text-[13px] font-medium text-muted-foreground'>
                            <Marker index={index} />
                            {label}
                        </dt>
                        <dd className='text-[15px]/normal'>
                            {tags && tags.length > 0 ? (
                                <Tags tags={tags} />
                            ) : (
                                text
                            )}
                        </dd>
                    </motion.div>
                ))}
            </dl>
        </motion.section>
    )
}

export default DetailsList
