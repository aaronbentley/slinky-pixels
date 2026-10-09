/**
 * SlinkyPixels : Sanity : Read Token
 * @description Server-only read token used for draft mode and live previews. Never import this into client components.
 */
export const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
    throw new Error('Missing environment variable: SANITY_API_READ_TOKEN')
}
