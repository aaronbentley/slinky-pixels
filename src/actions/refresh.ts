'use server'
/**
 * SlinkyPixels : Actions : Sanity Live Refresh
 * @description Called by <SanityLive /> for each content change. Restores the
 * next-sanity v12 behaviour: published changes are pushed to connected visitors
 * immediately (`updateTag`), while draft-mode changes revalidate and refresh the
 * route so Presentation Tool previews stay live.
 * @see https://github.com/sanity-io/next-sanity/blob/main/packages/next-sanity/MIGRATE-v12-to-v13.md
 */
import { parseTags } from 'next-sanity/live'
import { revalidateTag, updateTag } from 'next/cache'
import { draftMode } from 'next/headers'

export const refreshAction = async (
    unsafeTags: unknown
): Promise<'refresh' | void> => {
    const { isEnabled: isDraftMode } = await draftMode()
    const { tags } = parseTags(unsafeTags)

    for (const tag of tags) {
        if (isDraftMode) {
            revalidateTag(tag, 'max')
        } else {
            updateTag(tag)
        }
    }

    if (isDraftMode) return 'refresh'
}
