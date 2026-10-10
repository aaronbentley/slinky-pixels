/**
 * SlinkyPixels : UI Layout
 */
import Footer from '@/components/footer'
import Header from '@/components/header'

const UiLayout = async ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        /**
         * `isolate` lets page backgrounds (e.g. the slinky) sit at -z-10 behind
         * content, `overflow-clip` contains them without breaking sticky header
         */
        <div className='relative isolate flex min-h-dvh flex-col overflow-clip'>
            <Header />
            <div className='flex flex-1 flex-col items-center justify-start pb-16'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default UiLayout
