/**
 * SlinkyPixels : Global Not Found : 404
 */
import '@/assets/styles/globals.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { Typography } from '@/components/typography'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@ui/button'
import { ThemeProvider } from '@wrksz/themes/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import Link from 'next/link'

/**
 * Metadata
 * @description Alternatively can use an async function that returns a metadata object
 * @link https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
    title: {
        absolute: `404 : Page Not Found : ${process.env.APP_TITLE}`
    },
    description: 'The page you are looking for does not exist.'
}

const NotFound = () => (
    <html
        lang='en'
        data-scroll-behavior='smooth'
        suppressHydrationWarning>
        <body className={cn(GeistSans.variable, GeistMono.variable)}>
            <ThemeProvider
                attribute='data-theme'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
                enableColorScheme>
                <div className='flex min-h-dvh flex-col'>
                    <Header />
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
                    <Footer />
                </div>
            </ThemeProvider>
        </body>
    </html>
)

export default NotFound
