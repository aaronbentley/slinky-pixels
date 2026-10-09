// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://www.sanity.io/docs/nextjs/live-content-guide for more information.
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'
import { defineLive } from 'next-sanity/live'

export const { sanityFetch, SanityLive } = defineLive({
    client,
    serverToken: token,
    // Only sent to the browser when <SanityLive includeDrafts /> is rendered in draft mode
    browserToken: token
})
