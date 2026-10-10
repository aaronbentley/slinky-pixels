'use client'
/**
 * SlinkyPixels : Album Gallery
 * Numbered figures that open in a shared lightbox. Move between images with
 * the ← / → keys or the previous / next buttons; paging wraps at the ends.
 */
import Image, { ImageProps } from '@/components/image'
import { padNumber } from '@/lib/helpers'
import { Button } from '@ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@ui/dialog'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

const AlbumGallery = ({ images }: { images: ImageProps['image'][] }) => {
    /**
     * Open image index (null when closed) & the direction of the last move,
     * which sets the side the next image slides in from
     */
    const [index, setIndex] = useState<number | null>(null)
    const [direction, setDirection] = useState<1 | -1>(1)

    const count = images.length
    const image = index !== null ? images[index] : null

    /**
     * Move by one image, wrapping at either end
     */
    const page = (step: 1 | -1) => {
        setDirection(step)
        setIndex((current) =>
            current === null ? current : (current + step + count) % count
        )
    }

    return (
        <>
            <div className='flex flex-wrap gap-6'>
                {images.map((item, itemIndex) => (
                    <figure
                        key={item.asset!._id}
                        className='flex min-w-0 flex-[1_1_520px] flex-col gap-2.5'>
                        <button
                            type='button'
                            onClick={() => {
                                setDirection(1)
                                setIndex(itemIndex)
                            }}
                            className='group block cursor-zoom-in rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50'>
                            <Image
                                image={item}
                                alt={item.alt}
                                width={640}
                                height={360}
                                className='aspect-video w-full rounded-xl border-2 object-cover group-hover:border-transparent group-hover:gradient-border group-focus-visible:border-transparent group-focus-visible:gradient-border'
                            />
                            <span className='sr-only'>
                                View {item.alt || 'image'} full size
                            </span>
                        </button>
                        {item.alt && (
                            <figcaption className='flex gap-2.5 text-[13px] text-muted-foreground'>
                                <span className='font-mono'>
                                    {padNumber(itemIndex + 1)}
                                </span>
                                {item.alt}
                            </figcaption>
                        )}
                    </figure>
                ))}
            </div>

            <Dialog
                open={index !== null}
                onOpenChange={(open) => !open && setIndex(null)}>
                <DialogContent
                    className='min-w-[90%] xl:min-w-[85%] 2xl:min-w-[70%]'
                    onKeyDown={(event) => {
                        if (count < 2) return
                        if (event.key === 'ArrowLeft') {
                            event.preventDefault()
                            page(-1)
                        } else if (event.key === 'ArrowRight') {
                            event.preventDefault()
                            page(1)
                        }
                    }}>
                    {image && index !== null && (
                        <>
                            <DialogHeader className='pe-8'>
                                <DialogTitle>
                                    {image.alt || 'Image'}
                                </DialogTitle>
                                <DialogDescription
                                    aria-live='polite'
                                    className='font-mono text-xs'>
                                    <span className='sr-only'>Image </span>
                                    {padNumber(index + 1)}
                                    <span aria-hidden='true'> / </span>
                                    <span className='sr-only'> of </span>
                                    {padNumber(count)}
                                </DialogDescription>
                            </DialogHeader>
                            {/* Fixed-size stage, so the lightbox keeps its dimensions while paging */}
                            <div className='relative aspect-video max-h-[75vh] w-full overflow-hidden'>
                                {/* Outgoing & incoming images crossfade over each other */}
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            x: direction * 32
                                        }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{
                                            opacity: 0,
                                            x: direction * -32
                                        }}
                                        transition={{
                                            duration: 0.25,
                                            ease: 'easeOut'
                                        }}
                                        className='absolute inset-0'>
                                        {/* Shows the low-res preview until the full image loads */}
                                        <Image
                                            image={image}
                                            alt={image.alt}
                                            width={1600}
                                            mode='contain'
                                            priority
                                            className='absolute inset-0 size-full rounded-lg object-contain'
                                        />
                                    </motion.div>
                                </AnimatePresence>
                                {count > 1 && (
                                    <>
                                        <Button
                                            variant='outline'
                                            size='icon-lg'
                                            onClick={() => page(-1)}
                                            className='absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm'>
                                            <ChevronLeft aria-hidden='true' />
                                            <span className='sr-only'>
                                                Previous image
                                            </span>
                                        </Button>
                                        <Button
                                            variant='outline'
                                            size='icon-lg'
                                            onClick={() => page(1)}
                                            className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm'>
                                            <ChevronRight aria-hidden='true' />
                                            <span className='sr-only'>
                                                Next image
                                            </span>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AlbumGallery
