import { defineLocations } from 'sanity/presentation'

export const locations = {
    page: defineLocations({
        select: {
            id: '_id',
            title: 'title',
            slug: 'slug.current'
        },
        resolve: (doc) => ({
            locations: [
                {
                    title: doc?.title || 'Untitled',
                    href: doc?.id === 'frontpage' ? '/' : `/${doc?.slug}/`
                }
            ]
        })
    }),
    work: defineLocations({
        select: {
            title: 'title',
            slug: 'slug.current'
        },
        resolve: (doc) => ({
            locations: [
                {
                    title: doc?.title || 'Untitled',
                    href: `/work/${doc?.slug}/`
                },
                {
                    title: 'Work',
                    href: '/work/'
                }
            ]
        })
    }),
    post: defineLocations({
        select: {
            id: '_id',
            title: 'title',
            slug: 'slug.current'
        },
        resolve: (doc) => ({
            locations: [
                {
                    title: 'Posts',
                    href: '/posts/'
                },
                {
                    title: doc?.title || 'Untitled',
                    href: `/posts/${doc?.slug}/`
                }
            ]
        })
    })
}
