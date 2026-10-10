/**
 * SlinkyPixels : /[slug]/ - Page
 */
import Composer from '@/components/composer'
import PageCover from '@/components/page-cover'
import PageHero from '@/components/page-hero'
import {
    getMenuPosition,
    resolveDocumentReferenceURL,
    resolveMenuLinks
} from '@/lib/helpers'
import { buildMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/lib/live'
import { MENU_QUERY, PAGE_PATHS_QUERY, PAGE_QUERY } from '@/sanity/lib/queries'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => {
    const { data: pagePaths } = await sanityFetch({
        query: PAGE_PATHS_QUERY,
        perspective: 'published',
        stega: false
    })

    return pagePaths.map((page) => ({
        slug: page?.slug?.current
    }))
}

export const generateMetadata = async ({
    params
}: PageProps<'/[slug]'>): Promise<Metadata> => {
    const { slug } = await params
    const { data: page } = await sanityFetch({
        query: PAGE_QUERY,
        params: { slug },
        stega: false
    })

    /**
     * If page is not found, return 404
     */
    if (!page) notFound()

    return buildMetadata({
        title: page.seo?.seoTitle ?? page.title,
        description: page.seo?.seoDescription ?? page.subtitle,
        path: `/${slug}/`
    })
}

const Page = async ({ params }: PageProps<'/[slug]'>) => {
    const [{ data: page }, { data: menu }] = await Promise.all([
        sanityFetch({
            query: PAGE_QUERY,
            params: await params
        }),
        sanityFetch({
            query: MENU_QUERY,
            params: { title: 'Nav Menu' }
        })
    ])

    /**
     * Bail if no page found
     */
    if (!page) notFound()

    /**
     * Page position in the menu for the eyebrow, e.g. "01 — About"
     */
    const position = page.slug?.current
        ? getMenuPosition(
              resolveMenuLinks(menu?.links),
              resolveDocumentReferenceURL(page._type, page.slug)
          )
        : null

    return (
        <>
            <PageHero
                eyebrow={
                    position ? `${position.n} — ${position.label}` : undefined
                }
                title={page.title}
                subtitle={page.subtitle}
                bordered={!page.image?.asset}
            />
            <PageCover
                image={page.image}
                alt={page.title}
            />
            <Composer
                content={page.content}
                documentId={page._id}
                documentType={page._type}
                className='w-full gap-y-24 pt-18 pb-8'
            />
        </>
    )
}

export default Page
