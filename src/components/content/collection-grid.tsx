/**
 * SlinkyPixels : Content : Collection Grid
 */
import Link from '@/components/link'
import { resolveDocumentReferenceURL } from '@/lib/helpers'
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
import { stegaClean } from 'next-sanity'

type CollectionGridContentItemProps = {
    _id: string
    _type: string
    title: string
    subtitle: string
    excerpt: string
    slug: Slug
    image: ImageProps['image']
}

const CollectionGrid = async ({
    id,
    order,
    contentType,
    limit,
    content
}: {
    id: string
    order: number
    contentType?: 'post' | 'service' | 'team' | 'work' | 'custom'
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
