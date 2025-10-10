/**
 * SlinkyPixels : Content : Album
 */
import Image, { ImageProps } from '@/components/image'
import { cn } from '@/lib/utils'
import { type Album } from '@/sanity/types'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@ui/dialog'

const Album = ({
    id,
    order,
    images
}: {
    id: string
    order: number
    images?: ImageProps['image'][] | undefined
}) => {
    /**
     * If no images return null
     */
    if (!images) return null

    return (
        <div
            id={id}
            data-order={order}
            className={cn(['container', 'lg:max-w-[980px]'])}>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {images.map((image, index) => {
                    /**
                     * If no image or no image asset, return null
                     */
                    if (!image || !image.asset) return null

                    return (
                        <Dialog key={index}>
                            <DialogTrigger>
                                <Image
                                    image={image}
                                    alt={image.alt}
                                    width={400}
                                    // height={400}
                                    className='rounded-xl border-2 object-cover transition duration-200 hover:border-secondary'
                                />
                            </DialogTrigger>
                            <DialogContent className='min-w-[90%] xl:min-w-[85%] 2xl:min-w-[70%]'>
                                <DialogHeader>
                                    <DialogTitle>
                                        {image.alt || 'Image'}
                                    </DialogTitle>
                                    <DialogDescription className='sr-only'>
                                        {`${image.alt} image` || 'Image'}
                                    </DialogDescription>
                                </DialogHeader>
                                <Image
                                    image={image}
                                    alt={image.alt}
                                    width={1200}
                                    height={800}
                                    className='w-full rounded-lg object-cover'
                                />
                            </DialogContent>
                        </Dialog>
                    )
                })}
            </div>
        </div>
    )
}

export default Album
