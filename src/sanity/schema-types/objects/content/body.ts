/**
 * SlinkyPixels : Body
 */

import { BodyIcon } from '@/components/icons'
import { defineField, defineType } from 'sanity'

// Define content type
const contentType = 'Body'

export const Body = defineType({
    name: contentType.toLowerCase(),
    title: contentType,
    type: 'object',
    icon: BodyIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: `${contentType} Title`,
            validation: (Rule) =>
                Rule.required().error(`Specify ${contentType} Title`)
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'bodyPortableText',
            description: `${contentType} Content`,
            validation: (Rule) =>
                Rule.required().error(`Specify ${contentType} Content`)
        }),
        defineField({
            name: 'details',
            title: 'Details',
            type: 'details',
            description:
                'Optional, shown in a side column alongside the Content'
        })
    ],
    preview: {
        select: {
            title: 'title'
        },
        prepare: ({ title }) => ({
            title: title ? `[${contentType}] ${title}` : `[${contentType}]`
        })
    }
})
