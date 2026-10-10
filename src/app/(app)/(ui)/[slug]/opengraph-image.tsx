/**
 * SlinkyPixels : /[slug]/ - Open Graph Image
 * A page's share card: its menu position, title & subtitle
 */
import {
    getMenuPosition,
    prettifyUrl,
    resolveDocumentReferenceURL,
    resolveMenuLinks
} from '@/lib/helpers'
import { loadFonts, ShareCard } from '@/lib/og'
import { client } from '@/sanity/lib/client'
import { MENU_QUERY, PAGE_QUERY } from '@/sanity/lib/queries'
import { ImageResponse } from 'next/og'

const size = {
    width: 1200,
    height: 630
}

const contentType = 'image/png'

const fetchPage = (slug: string) =>
    client.withConfig({ stega: false }).fetch(PAGE_QUERY, { slug })

/**
 * Image metadata, for a per-page alt text. When the image itself is served,
 * Next calls this with empty params (only the id matters then), so skip the
 * fetch without a slug
 */
export const generateImageMetadata = async ({
    params
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params
    const page = slug ? await fetchPage(slug) : null

    return [
        {
            id: 'og',
            alt: page
                ? `${page.title} : ${process.env.APP_TITLE!}`
                : process.env.APP_TITLE!,
            size,
            contentType
        }
    ]
}

const OpengraphImage = async ({
    params
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params
    const [page, menu] = await Promise.all([
        fetchPage(slug),
        client
            .withConfig({ stega: false })
            .fetch(MENU_QUERY, { title: 'Nav Menu' })
    ])

    /**
     * Page position in the menu for the eyebrow, e.g. "01 — About"
     */
    const position = page?.slug?.current
        ? getMenuPosition(
              resolveMenuLinks(menu?.links),
              resolveDocumentReferenceURL(page._type, page.slug)
          )
        : null

    return new ImageResponse(
        <ShareCard
            eyebrow={position ? `${position.n} — ${position.label}` : null}
            title={page?.title ?? process.env.APP_TITLE!}
            subtitle={page?.subtitle}
            siteName={process.env.APP_TITLE!}
            siteUrl={prettifyUrl(process.env.APP_URL!)}
        />,
        {
            ...size,
            fonts: await loadFonts()
        }
    )
}

export default OpengraphImage
