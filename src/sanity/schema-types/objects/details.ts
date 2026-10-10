/**
 * SlinkyPixels : Details
 * A titled list of label / value rows, e.g. "At a glance" alongside a Body
 */
import { DetailsIcon } from '@/components/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

// Define content type
const contentType = 'Details'

export const Details = defineType({
    name: contentType.toLowerCase(),
    title: contentType,
    type: 'object',
    icon: DetailsIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: `${contentType} Title, e.g. "At a glance"`
        }),
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'detailsItem',
                    title: 'Item',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (Rule) =>
                                Rule.required().error('Specify a Label')
                        }),
                        defineField({
                            name: 'text',
                            title: 'Text',
                            type: 'text',
                            rows: 2,
                            description: 'Shown when there are no Tags'
                        }),
                        defineField({
                            name: 'tags',
                            title: 'Tags',
                            type: 'array',
                            of: [{ type: 'string' }],
                            options: {
                                layout: 'tags'
                            }
                        })
                    ],
                    validation: (Rule) =>
                        Rule.custom((value) => {
                            const item = value as
                                { text?: string; tags?: string[] } | undefined
                            if (!item?.text && !item?.tags?.length) {
                                return 'Specify Text or Tags'
                            }
                            return true
                        }),
                    preview: {
                        select: {
                            title: 'label',
                            text: 'text',
                            tags: 'tags'
                        },
                        prepare: ({ title, text, tags }) => ({
                            title,
                            subtitle: tags?.length ? tags.join(', ') : text
                        })
                    }
                })
            ]
        })
    ]
})
