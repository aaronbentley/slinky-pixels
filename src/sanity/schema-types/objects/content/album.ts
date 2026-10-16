/**
 * SlinkyPixels : Album
 */

import { ImagesIcon } from '@/components/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

// Define content type
const contentType = 'Album'

export const Album = defineType({
    name: contentType.toLowerCase(),
    title: contentType,
    type: 'object',
    icon: ImagesIcon,
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
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'image',
                    title: 'Image',
                    options: {
                        hotspot: true
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt Text',
                            description: 'Image alt text'
                        },
                        {
                            name: 'caption',
                            type: 'text',
                            title: 'Caption',
                            rows: 2,
                            description:
                                'Optional, what the image shows & why it matters. Falls back to the Alt Text'
                        }
                    ]
                })
            ],
            description: `${contentType} Content`,
            validation: (Rule) =>
                Rule.required().error(`Specify ${contentType} Content`)
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
