/**
 * SlinkyPixels : Queries
 */
import { defineQuery } from 'next-sanity'

/**
 * Common fragments
 */
export const slug = `
    slug {
        current
    }
`

const imageAssetReference = `
    image {
        ...,
        asset-> {
            ...,
            metadata
        }
    }
`

const seo = `
    seo {
        seoTitle,
        seoDescription
    }
`

/**
 * Content type [Block] fragment
 */
const frontpage = `
    _type == 'frontpage' => {
        title,
        eyebrow,
        headline,
        intro,
        buttons[] {
            _key,
            label,
            customUrl,
            destinationHref,
            destinationRef-> {
                _type,
                title,
                ${slug}
            },
            blank
        },
        showRecentWork,
        recentWorkCount,
        'recentWork': select(
            showRecentWork != false => *[
                _type == 'work' &&
                defined(slug.current)
            ] | order(coalesce(date, _createdAt) desc)[0...10] {
                _id,
                _type,
                title,
                ${slug}
            },
            []
        )
    }
`

const body = `
    _type == 'body' => {
        content[] {
            ...,
            markDefs[] {
                ...,
                (_type == 'link' && customUrl != true) => {  
                    destinationRef-> {
                        _type,
                        title,
                        ${slug}
                    }
                }
            },
        }
    }
`

const collectionGrid = `
    _type == 'collectionGrid' => {
        contentType,
        limit,
        "content": select(
            defined(customContent) && contentType == 'custom' => customContent[]-> {
                _id,
                _type,
                title,
                subtitle,
                excerpt,
                uses,
                ${slug},
                ${imageAssetReference}
            },
            defined(contentType) && contentType != 'custom'  => *[_type == ^.contentType] {
                _id,
                _type,
                title,
                subtitle,
                excerpt,
                uses,
                ${slug},
                ${imageAssetReference}
            }|order(title asc),
            []
        )
    }
`

const album = `
    _type == 'album' => {
        title,
        images[] {
            ...,
            _type,
            asset->,
            crop,
            hotspot
        }
    }
`

const content = `
    content[] {
        ...,
        _key,
        _type,
        'title': coalesce(title, 'Content Title'),
        ${frontpage},
        ${body},
        ${collectionGrid},
        ${album}
    }
`

/**
 * Document type [Page] queries
 */
export const PAGE_PATHS_QUERY = defineQuery(`
    *[
        _type == 'page' &&
        defined(slug.current) &&
        slug.current != '/'
    ] {
        ${slug}
    }
`)

// export const PAGES_QUERY = defineQuery(`
//     *[
//         _type == 'page' &&
//         defined(slug.current) &&
//         slug.current != '/'
//     ] {
//         ...,
//         ${imageAssetReference}
//     }
// `)

export const PAGE_QUERY = defineQuery(`
    *[
        _type == 'page' && 
        defined(slug.current) &&
        slug.current == $slug
    ][0] {
        _id,
        _type,
        title,
        subtitle,
        ${slug},
        ${content},
        ${imageAssetReference},
        ${seo}
    }
`)

/**
 * Document type [Post] queries
 */
export const POST_PATHS_QUERY = defineQuery(`
    *[
        _type == 'post' && 
        defined(slug.current)
    ]{ 
        ${slug}
    }
`)

// export const POSTS_QUERY = defineQuery(`
//     *[
//         _type == 'post' &&
//         defined(slug.current)
//     ] {
//         _id,
//         title,
//         ${slug},
//     }
// `)

export const POST_QUERY = defineQuery(`
    *[
        _type == 'post' && 
        defined(slug.current) &&
        slug.current == $slug
    ][0] {
        _id,
        _type,
        title,
        subtitle,
        ${content},
        ${imageAssetReference}
    }
`)

/**
 * Document type [Work] queries
 */
export const WORK_PATHS_QUERY = defineQuery(`
    *[
        _type == 'work' &&
        defined(slug.current)
    ] {
        ${slug}
    }
`)

// export const WORKS_QUERY = defineQuery(`
//     *[
//         _type == 'work' &&
//         defined(slug.current)
//     ] {
//         ...,
//         ${imageAssetReference}
//     }
// `)

export const WORK_QUERY = defineQuery(`
    *[
        _type == 'work' &&
        defined(slug.current) &&
        slug.current == $slug
    ][0] {
        _id,
        _type,
        title,
        subtitle,
        url,
        uses,
        ${content},
        ${imageAssetReference},
        ${seo},
        'collection': *[
            _type == 'page' &&
            slug.current == 'work'
        ][0].content[_type == 'collectionGrid'][0].customContent[]-> {
            _id,
            _type,
            title,
            ${slug}
        }
    }
`)

/**
 * Document type [Menu] queries
 */
export const MENU_QUERY = defineQuery(`
    *[
        _type == 'menu' && 
        title == $title
    ][0] {
        ...,
        links[] {
            _key,
            label,
            customUrl,
            destinationHref,
            destinationRef->,
            blank
        }
    }   
`)

/**
 * Document type [Settings] queries
 */
export const SETTINGS_QUERY = defineQuery(`
    *[_type == 'settings'][0] {
        title,
        description,
        url,
        socialLinks
    }
`)

/**
 * Sitemap query
 */
export const SITEMAP_QUERY = defineQuery(`
    *[
        _type == "page" && defined(slug.current) ||
        _type == "work" && defined(slug.current)
    ] | order(slug.current desc) | order(_createdAt asc){
        _type,
        _updatedAt,
        slug
    }
`)
