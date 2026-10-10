/**
 * SlinkyPixels : Global Not Found : 404
 * Rendered when no route matches. Next skips the layouts here, so this
 * brings its own document, styles, fonts, theme, header and footer.
 */
import '@/assets/styles/globals.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import IconGradient from '@/components/icon-gradient'
import NotFoundContent, {
    notFoundMetadata
} from '@/components/not-found-content'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@wrksz/themes/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

/**
 * Metadata
 * @description Alternatively can use an async function that returns a metadata object
 * @link https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = notFoundMetadata

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
                <IconGradient />
                <div className='relative isolate flex min-h-dvh flex-col overflow-clip'>
                    <Header />
                    <NotFoundContent />
                    <Footer />
                </div>
            </ThemeProvider>
        </body>
    </html>
)

export default NotFound
