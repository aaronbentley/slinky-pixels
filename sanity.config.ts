'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */
import { apiVersion, dataset, projectId, projectName } from '@/sanity/env'
import { locations } from '@/sanity/lib/locations'
import { structure } from '@/sanity/lib/structure'
import { schema } from '@/sanity/schema-types'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

export default defineConfig({
    basePath: '/studio',
    title: projectName,
    projectId,
    dataset,
    schema,
    plugins: [
        structureTool({ structure }),
        presentationTool({
            resolve: {
                locations
            },
            previewUrl: {
                previewMode: {
                    enable: '/api/draft-mode/enable',
                    disable: '/api/draft-mode/disable'
                }
            }
        }),
        visionTool({ defaultApiVersion: apiVersion })
    ],
    document: {
        comments: {
            enabled: false
        },
        newDocumentOptions: (prev, { creationContext }) => {
            if (creationContext.type === 'global') {
                return prev.filter(
                    (templateItem) =>
                        !['settings'].includes(templateItem.templateId)
                )
            }
            return prev
        },
        actions: (prev, { schemaType }) => {
            if (schemaType === 'settings') {
                return prev.filter(
                    ({ action }) =>
                        !['unpublish', 'delete', 'duplicate'].includes(action!)
                )
            }
            return prev
        }
    },
    tasks: { enabled: false },
    scheduledPublishing: { enabled: false },
    scheduledDrafts: { enabled: false },
    releases: { enabled: false }
})
