/**
 * SlinkyPixels : frontpage
 */
import Composer from '@/components/composer'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_QUERY } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
    title: {
        absolute: `${process.env.APP_TITLE!} - ${process.env.APP_DESCRIPTION!}`
    }
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
        <Composer
            content={frontPage?.content}
            documentId={frontPage._id}
            documentType={frontPage._type}
            className='min-h-dvh'
        />
    )
}

export default Frontpage
