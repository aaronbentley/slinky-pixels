/**
 * SlinkyPixels : Composer
 */
import Album from '@/components/content/album'
import Body from '@/components/content/body'
import CollectionGrid from '@/components/content/collection-grid'
import Frontpage from '@/components/content/frontpage'
import { cn } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import {
    PAGE_QUERY_RESULT,
    POST_QUERY_RESULT,
    WORK_QUERY_RESULT
} from '@/sanity/types'
import { createDataAttribute, StegaBranded, StegaCleaned } from 'next-sanity'

/**
 * Lookup map to match content type to a component
 */
const contentComponents = {
    frontpage: Frontpage,
    body: Body,
    collectionGrid: CollectionGrid,
    album: Album
}

/**
 * Create type for content component type
 */
export type ContentComponentType = keyof typeof contentComponents

/**
 * Map content components to content
 */
const Content = ({
    id,
    type,
    order,
    ...rest
}: {
    id: string
    type: ContentComponentType
    order: number
    [key: string]: unknown
}) => {
    /**
     * If type is not in contentComponents return null
     */
    if (!(type in contentComponents)) return null

    /**
     * Create component by matching type to contentTypes key
     */
    const Component = contentComponents[type]

    return (
        <Component
            id={id}
            order={order}
            {...rest}
        />
    )
}

/**
 * Compose content block types into content components
 * indexed access types to allow more content types post, team, proposal etc...
 */
type ContentDocumentQueryResult = Extract<
    PAGE_QUERY_RESULT | POST_QUERY_RESULT | WORK_QUERY_RESULT,
    { content: unknown }
>

/**
 * Stega-aware: content keeps stega encoding in draft mode so Visual Editing can
 * offer click-to-edit, so string leaves may carry a `StegaString` brand.
 */
type ContentType =
    | (
          | StegaCleaned<ContentDocumentQueryResult>
          | StegaBranded<ContentDocumentQueryResult>
      )['content']
    | null

const Composer = ({
    content,
    documentId,
    documentType,
    path = 'content',
    className
}: {
    content: ContentType | null
    documentId: string
    documentType: string
    path?: string
    className?: string
}) => {
    /**
     * If content is empty, return null
     */
    if (!content || content.length === 0) return null

    /**
     * Get client config for Visual Editing data attributes
     */
    const { projectId, dataset, stega } = client.config()
    const createDataAttributeConfig = {
        projectId,
        dataset,
        baseUrl: typeof stega.studioUrl === 'string' ? stega.studioUrl : ''
    }

    return (
        <main
            className={cn(['flex', 'flex-col', 'gap-y-16', className])}
            data-sanity={createDataAttribute({
                ...createDataAttributeConfig,
                id: documentId,
                type: documentType,
                path
            }).toString()}>
            {content &&
                content.map(({ _type, _key, ...rest }, index: number) => (
                    <Content
                        key={_key}
                        id={_key}
                        type={_type}
                        order={index}
                        {...rest}
                    />
                ))}
        </main>
    )
}

export default Composer
