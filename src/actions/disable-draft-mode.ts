'use server'
/**
 * SlinkyPixels : Actions : Disable Draft Mode
 * @description Turns off draft mode without leaving the current page; the route re-renders with published content.
 * @see https://nextjs.org/docs/app/guides/draft-mode
 */
import { draftMode } from 'next/headers'

export const disableDraftMode = async () => {
    ;(await draftMode()).disable()
}
