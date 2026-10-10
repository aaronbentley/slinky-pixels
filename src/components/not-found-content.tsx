/**
 * SlinkyPixels : Not Found Content
 *
 * The 404 page body, shared by `(ui)/not-found` (a route calls `notFound()`)
 * and `global-not-found` (no route matches). Render inside an `isolate`
 * parent, the slinky sits at -z-10.
 */
import Slinky from '@/components/slinky'
import { Typography } from '@/components/typography'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const notFoundMetadata: Metadata = {
    title: {
        absolute: `404 : Page Not Found : ${process.env.APP_TITLE}`
    },
    description: 'The page you are looking for does not exist.'
}

const NotFoundContent = () => (
    <>
        <Slinky preset='home' />
        <div className='flex flex-1 flex-col items-center justify-center gap-y-4 md:gap-y-8'>
            <Typography
                variant='h1'
                className={cn([
                    'p-2',
                    'text-transparent',
                    'bg-linear-125',
                    'from-primary',
                    'via-secondary',
                    'to-tertiary',
                    'bg-clip-text',
                    'text-center'
                ])}>
                Page Not Found
            </Typography>
            <Typography>
                The page you are looking for does not exist.
            </Typography>

            <Link
                href='/'
                title='Go to Frontpage'
                aria-label='Go to Frontpage'
                className={cn(
                    buttonVariants({
                        variant: 'secondary',
                        size: 'lg'
                    }),
                    'text-background',
                    'min-w-24',
                    'hover:text-background'
                )}>
                Go to Frontpage
            </Link>
        </div>
    </>
)

export default NotFoundContent
