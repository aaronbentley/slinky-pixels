/**
 * SlinkyPixels : Global Not Found : 404
 */
import '@/assets/styles/globals.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { headingBaseClasses, Typography } from '@/components/typography'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@ui/button'
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
        className='dark'
        data-scroll-behavior='smooth'
        suppressHydrationWarning>
        <body className={GeistSans.variable}>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
                enableColorScheme>
                <div className='flex min-h-dvh flex-col'>
                    <Header />
                    <div className='flex flex-1 flex-col items-center justify-center gap-y-4 md:gap-y-8'>
                        <Typography
                            variant='h1'
                            as='h1'
                            className={cn([
                                headingBaseClasses,
                                'p-2',
                                'text-transparent',
                                'bg-linear-125',
                                'from-primary',
                                'via-secondary',
                                'to-tertiary',
                                'bg-clip-text',
                                'text-center',
                                'tracking-tighter'
                            ])}>
                            Page Not Found
                        </Typography>
                        <Typography>
                            The page you are looking for does not exist.
                        </Typography>

                        <Button
                            asChild
                            className={cn(
                                buttonVariants({
                                    variant: 'secondary',
                                    size: 'lg'
                                }),
                                'text-background',
                                'min-w-24',
                                'hover:text-background'
                            )}>
                            <Link
                                href='/'
                                title='Go to Frontpage'
                                aria-label='Go to Frontpage'>
                                Go to Frontpage
                            </Link>
                        </Button>
                    </div>
                    <Footer />
                </div>
            </ThemeProvider>
        </body>
    </html>
)

export default NotFound
