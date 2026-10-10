/**
 * SlinkyPixels : Content : Album
 * A titled, numbered gallery, e.g. a work item's screenshots. Images open
 * full size in a lightbox, paged with the arrow keys or buttons.
 */
import AlbumGallery from '@/components/album-gallery'
import { ImageProps } from '@/components/image'
import { padNumber } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const Album = ({
    id,
    order,
    title,
    images
}: {
    id: string
    order: number
    title?: string
    images?: ImageProps['image'][] | undefined
}) => {
    /**
     * Only images with an asset can be shown
     */
    const validImages = (images ?? []).filter((image) => image?.asset)

    /**
     * If no images return null
     */
    if (validImages.length === 0) return null

    return (
        <section
            id={id}
            data-order={order}
            aria-labelledby={title ? `${id}-heading` : undefined}
            className={cn([
                'mx-auto',
                'flex',
                'w-full',
                'max-w-7xl',
                'flex-col',
                'gap-5',
                'px-8'
            ])}>
            {title && (
                <div className='flex items-baseline justify-between gap-4 border-t border-foreground pt-5'>
                    <h2
                        id={`${id}-heading`}
                        className='text-[2.125rem]/[1.1] font-semibold tracking-tighter'>
                        {title}
                    </h2>
                    <span className='font-mono text-xs text-muted-foreground'>
                        {padNumber(validImages.length)}
                    </span>
                </div>
            )}
            <AlbumGallery images={validImages} />
        </section>
    )
}

export default Album
