/**
 * SlinkyPixels : Not Found : 404
 * Rendered when a route calls `notFound()`. Unmatched URLs use
 * `global-not-found` instead.
 */
import NotFoundContent, {
    notFoundMetadata
} from '@/components/not-found-content'
import { Metadata } from 'next'

/**
 * Metadata
 * @description Alternatively can use an async function that returns a metadata object
 * @link https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = notFoundMetadata

const NotFound = () => <NotFoundContent />

export default NotFound
