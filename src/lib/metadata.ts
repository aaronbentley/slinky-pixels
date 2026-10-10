/**
 * SlinkyPixels : Metadata
 */
import type { Metadata } from 'next'

/**
 * Build a route's metadata: title, description, canonical URL, Open Graph &
 * Twitter. A route's `openGraph` & `twitter` replace (not merge with) the
 * layout's, so the site-wide fields are repeated here. Share images come
 * from the `opengraph-image` file conventions, which take precedence.
 */
export const buildMetadata = ({
    title,
    description,
    path,
    absoluteTitle = false,
    type = 'website'
}: {
    title: string
    description?: string | null
    /**
     * Path from the site root, with the trailing slash, e.g. '/about/'
     */
    path: string
    /**
     * Skip the layout's "%s : SlinkyPixels" title template
     */
    absoluteTitle?: boolean
    type?: 'website' | 'article'
}): Metadata => ({
    title: absoluteTitle ? { absolute: title } : title,
    description: description ?? process.env.APP_DESCRIPTION!,
    alternates: {
        canonical: path
    },
    openGraph: {
        type,
        locale: 'en_GB',
        siteName: process.env.APP_TITLE!,
        url: path,
        title,
        description: description ?? process.env.APP_DESCRIPTION!
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description: description ?? process.env.APP_DESCRIPTION!
    }
})
