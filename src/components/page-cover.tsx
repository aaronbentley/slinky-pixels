/**
 * SlinkyPixels : Page Cover
 * A wide cover image under the page hero, cropped around the Sanity hotspot
 */
import Image, { ImageProps } from '@/components/image'
import { cn } from '@/lib/utils'

const PageCover = ({
    image,
    alt,
    aspect = 'wide'
}: {
    image?: ImageProps['image'] | null
    alt: string
    /**
     * `wide` - 16:9 on phones, 21:9 from md up (pages)
     * `video` - 16:9 everywhere (work items)
     */
    aspect?: 'wide' | 'video'
}) => {
    /**
     * Bail if no image
     */
    if (!image?.asset) return null

    return (
        <div className='mx-auto w-full max-w-7xl px-8'>
            <Image
                image={image}
                alt={alt}
                width={1280}
                height={aspect === 'wide' ? 549 : 720}
                priority
                className={cn(
                    'w-full rounded-2xl border object-cover',
                    aspect === 'wide'
                        ? 'aspect-video md:aspect-21/9'
                        : 'aspect-video'
                )}
            />
        </div>
    )
}

export default PageCover
