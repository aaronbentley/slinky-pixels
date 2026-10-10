/**
 * SlinkyPixels : Content : Collection Grid
 */
import Link from '@/components/link'
import Marker from '@/components/marker'
import RowLink from '@/components/row-link'
import Tags from '@/components/tags'
import { Typography } from '@/components/typography'
import { padNumber, resolveDocumentReferenceURL } from '@/lib/helpers'
import { fadeUp, stagger } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Slug } from '@/sanity/types'
import Image, { ImageProps } from '@components/image'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@ui/card'
import * as motion from 'motion/react-client'
import { stegaClean } from 'next-sanity'

type CollectionGridContentItemProps = {
    _id: string
    _type: string
    title: string
    subtitle: string
    excerpt: string
    uses?: string[] | null
    slug: Slug
    image: ImageProps['image']
}

const CollectionGrid = async ({
    id,
    order,
    title,
    contentType,
    layout,
    limit,
    content
}: {
    id: string
    order: number
    title?: string
    contentType?: 'post' | 'service' | 'team' | 'work' | 'custom'
    layout?: 'grid' | 'list' | null
    limit?: number | undefined
    content?: CollectionGridContentItemProps[] | null
}) => {
    /**
     * Clean stega encoding before comparing against literals
     */
    const type = stegaClean(contentType)

    /**
     * If no contentType return null
     */
    if (!type) return null

    /**
     * If contentType is custom & no custom return null
     */
    if (type === 'custom' && !content) return null

    /**
     * Apply the limit, except to custom content
     */
    const items = (
        content && type !== 'custom' && limit
            ? content.slice(0, limit)
            : (content ?? [])
    ).filter((item) => item?.slug?.current)

    /**
     * List layout - numbered rows with a thumbnail, e.g. the Work index
     */
    if (stegaClean(layout) === 'list') {
        return (
            <div
                id={id}
                data-order={order}
                className='mx-auto flex w-full max-w-7xl flex-col gap-4 px-8'>
                {title && (
                    <div className='flex items-baseline justify-between gap-4'>
                        <Typography
                            variant='label'
                            as='h2'>
                            {title}
                        </Typography>
                        <Typography variant='label'>
                            {padNumber(items.length)}{' '}
                            {stegaClean(title).toLowerCase()}
                        </Typography>
                    </div>
                )}
                <motion.ul
                    initial='hidden'
                    animate='show'
                    variants={stagger(0.15)}
                    className='flex flex-col border-t border-foreground'>
                    {items.map((item, index) => (
                        <motion.li
                            key={item._id}
                            variants={fadeUp}
                            className='border-b'>
                            <RowLink
                                href={resolveDocumentReferenceURL(
                                    item._type,
                                    item.slug
                                )}
                                arrow='up-right'
                                arrowClassName='size-5.5'
                                className='flex-wrap gap-x-10 gap-y-5 py-7 hover:px-4 focus-visible:px-4'>
                                <span className='w-8 self-start pt-2.5 font-mono text-xs text-muted-foreground'>
                                    {padNumber(index + 1)}
                                </span>
                                <span className='flex min-w-0 flex-[999_1_420px] flex-col gap-2.5'>
                                    <span className='flex items-center gap-3 text-4xl/[1.1] font-semibold tracking-tighter'>
                                        <Marker
                                            index={index}
                                            className='size-2.5'
                                        />
                                        {item.title}
                                    </span>
                                    <span className='text-[17px]/normal text-muted-foreground'>
                                        {item.subtitle}
                                    </span>
                                    <Tags
                                        tags={item.uses}
                                        className='mt-1.5'
                                    />
                                </span>
                                {item.image && (
                                    <Image
                                        image={item.image}
                                        alt={item.title}
                                        width={360}
                                        height={203}
                                        className='aspect-video max-w-90 min-w-0 flex-[1_1_280px] rounded-xl border-2 object-cover group-hover:border-transparent group-hover:gradient-border group-focus-visible:border-transparent group-focus-visible:gradient-border'
                                    />
                                )}
                            </RowLink>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        )
    }

    return (
        <div
            id={id}
            data-order={order}
            className={cn(['container', 'lg:max-w-[980px]'])}>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {content &&
                    (type !== 'custom' && limit
                        ? content.slice(0, limit)
                        : content
                    ).map((contentItem) => {
                        /**
                         * If no content item, return null
                         */
                        if (!contentItem) return null

                        /**
                         * If no content item slug, return null
                         */
                        if (!contentItem.slug || !contentItem.slug.current)
                            return null

                        /**
                         * Resolve document reference URL
                         */
                        const href = resolveDocumentReferenceURL(
                            contentItem._type,
                            contentItem.slug
                        )

                        return (
                            <Link
                                key={contentItem._id}
                                href={href}
                                title={`View ${contentItem.title}`}
                                className='group'>
                                <Card className='h-full overflow-hidden border-2 pt-0 transition-colors duration-200 group-hover:border-secondary-foreground'>
                                    {contentItem.image && (
                                        <Image
                                            image={contentItem.image}
                                            alt={contentItem.title}
                                            width={480}
                                            height={320}
                                            className='aspect-4/3 object-cover data-[lqip=true]:aspect-4/3!'
                                        />
                                    )}
                                    <CardHeader>
                                        <CardTitle>
                                            {contentItem.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            {contentItem.subtitle}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
            </div>
        </div>
    )
}

export default CollectionGrid
