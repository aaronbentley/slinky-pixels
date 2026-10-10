/**
 * SlinkyPixels : frontpage
 */
import Composer from '@/components/composer'
import Slinky from '@/components/slinky'
import { buildMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_QUERY } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const generateMetadata = async (): Promise<Metadata> => {
    const { data: frontPage } = await sanityFetch({
        query: PAGE_QUERY,
        params: { slug: '/' },
        stega: false
    })

    const title = frontPage?.seo?.seoTitle ?? process.env.APP_TITLE!
    const description =
        frontPage?.seo?.seoDescription ?? process.env.APP_DESCRIPTION!

    return buildMetadata({
        title: `${title} - ${description}`,
        description,
        path: '/',
        absoluteTitle: true
    })
}

const Frontpage = async () => {
    const { data: frontPage } = await sanityFetch({
        query: PAGE_QUERY,
        params: {
            slug: '/'
        }
    })

    /**
     * If page is not found, return 404
     */
    if (!frontPage) notFound()

    return (
        <>
            <Slinky preset='home' />
            <Composer
                content={frontPage?.content}
                documentId={frontPage._id}
                documentType={frontPage._type}
                className='w-full flex-1'
            />
        </>
    )
}

export default Frontpage
