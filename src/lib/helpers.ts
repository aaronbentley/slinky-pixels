/**
 * SlinkyPixels : Helpers
 */

/**
 * Resolve link URL as either a document reference or a custom URL
 */
export const resolveLinkURL = ({
    customUrl = false,
    destinationRef = undefined,
    destinationHref = undefined
}: {
    customUrl: boolean | undefined
    destinationRef:
        | { _type: string; title: string; slug: { current: string } }
        | undefined
        | null
    destinationHref: string | undefined
}) => {
    /**
     * Bail early if no link to resolve
     */
    if (!destinationRef && !destinationHref) {
        console.error('No link to resolve.', {
            customUrl,
            destinationRef,
            destinationHref
        })
        throw new Error('No link to resolve.')
    }

    /**
     * Check if Menu Item is a reference
     */
    const isReference = !customUrl && destinationRef && destinationRef._type

    /**
     * Resolve link URLs if a reference, else pass through the custom URL
     */
    if (isReference) {
        return resolveDocumentReferenceURL(
            destinationRef._type,
            destinationRef.slug
        )
    } else {
        if (destinationHref) {
            return destinationHref
        } else {
            return '#'
        }
    }
}

/**
 * Resolve document reference URLs
 */
export const resolveDocumentReferenceURL = (
    type: string,
    slug: { current: string }
) => {
    /**
     * Throw error if no document type or slug to resolve
     */
    if (!type) {
        throw new Error('No document type to resolve.')
    }
    if (!slug) {
        throw new Error('No document slug to resolve.')
    }

    const documentPrefixMap: {
        [key: string]: string
    } = {
        post: 'posts',
        work: 'work'
    }

    switch (type) {
        case 'post':
        case 'work':
            return `/${documentPrefixMap[type]}/${slug.current}/`
        case 'page':
            /**
             * Catch frontpage slug '/'
             */
            if (slug.current === '/') {
                return slug.current
            }

            /**
             * Catch all other pages
             */
            return `/${slug.current}/`
        default:
            return slug.current
    }
}

/**
 * Prettify url by removing protocol and trailing slash
 */
export const prettifyUrl = (url: string) => {
    return url
        .replace(/(^\w+:|^)\/\//, '') // Remove protocol
        .replace(/\/$/, '') // Remove trailing slash
}

/**
 * Slugify text for use as an element id / URL hash
 */
export const slugify = (text: string) =>
    text
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '') // Remove accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // Collapse non-alphanumerics to hyphens
        .replace(/^-+|-+$/g, '') // Trim leading & trailing hyphens

/**
 * Pad a number to two digits, e.g. 1 → '01'
 */
export const padNumber = (n: number) => String(n).padStart(2, '0')

/**
 * Resolve menu links into valid { href, label } items, skipping incomplete links
 */
export const resolveMenuLinks = (
    links:
        | {
              _key: string
              label?: string | null
              customUrl?: boolean | null
              destinationRef?: {
                  _type: string
                  title: string
                  slug: { current: string }
              } | null
              destinationHref?: string | null
              blank?: boolean | null
          }[]
        | null
        | undefined
) =>
    (links ?? []).flatMap(
        ({
            _key,
            label,
            customUrl,
            destinationRef,
            destinationHref,
            blank
        }) => {
            /**
             * Verify link properties
             */
            if (!label || !destinationRef || (customUrl && !destinationHref))
                return []

            /**
             * Resolve menu item URL
             */
            const href = resolveLinkURL({
                customUrl: customUrl ?? undefined,
                destinationRef: destinationRef ?? undefined,
                destinationHref: destinationHref ?? undefined
            })

            return [{ _key, label, href, blank: blank ?? false }]
        }
    )

/**
 * Whether a path is the link's page or nested below it (e.g. /work/x → /work/)
 */
export const isActivePath = (pathname: string, href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

/**
 * A page's position in the menu, e.g. { n: '01', label: 'About' }
 */
export const getMenuPosition = (
    links: ReturnType<typeof resolveMenuLinks>,
    href: string
) => {
    const index = links.findIndex((link) => link.href === href)

    return index === -1
        ? null
        : { n: padNumber(index + 1), label: links[index].label }
}
