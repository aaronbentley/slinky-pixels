/**
 * SlinkyPixels : Content : Collection Grid
 */
import { CollectionGridIcon } from '@/components/icons'
import { CustomContentPreview } from '@/sanity/custom-content-preview'
import { CollectionGrid as TCollectionGrid } from '@/sanity/types'
import camelcase from 'camelcase'
import { defineArrayMember, defineField, defineType } from 'sanity'

// Define content type
const contentType = 'Collection Grid'

// Define types map
const typesMap = {
    post: 'Posts',
    page: 'Pages',
    work: 'Work',
    custom: 'Custom'
}

export const CollectionGrid = defineType({
    name: camelcase(contentType),
    title: contentType,
    type: 'object',
    icon: CollectionGridIcon,
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
            name: 'contentType',
            title: 'Content Type',
            type: 'string',
            description: `${contentType} Content Type`,
            options: {
                list: Object.keys(typesMap).map((key) => ({
                    title: typesMap[key as keyof typeof typesMap],
                    value: key
                }))
            },
            validation: (Rule) =>
                Rule.required().error(`Specify ${contentType} Type`)
        }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            description: `${contentType} Layout`,
            options: {
                list: [
                    { title: 'Grid', value: 'grid' },
                    { title: 'List', value: 'list' }
                ],
                layout: 'radio',
                direction: 'horizontal'
            },
            initialValue: 'grid'
        }),
        defineField({
            name: 'limit',
            title: 'Limit',
            type: 'number',
            description: `Optionally, limit the number of ${contentType} items`,
            hidden: ({ parent }) => parent?.contentType === 'custom',
            validation: (Rule) =>
                Rule.custom((currentValue, context) => {
                    // Allow empty initial value
                    // if (currentValue === undefined) return true

                    // Ensure context.parent is typed correctly
                    const parent = context.parent as TCollectionGrid | undefined

                    if (parent?.contentType !== 'custom' && !currentValue) {
                        return `Specify ${contentType} Limit`
                    }

                    return true
                })
        }),
        defineField({
            name: 'customContent',
            title: 'Custom Content',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    name: 'page',
                    to: [
                        {
                            type: 'page',
                            components: {
                                preview: CustomContentPreview
                            }
                        }
                    ],
                    options: {
                        disableNew: true
                    }
                }),
                defineArrayMember({
                    type: 'reference',
                    name: 'post',
                    to: [
                        {
                            type: 'post',
                            components: {
                                preview: CustomContentPreview
                            }
                        }
                    ],
                    options: {
                        disableNew: true
                    }
                }),
                defineArrayMember({
                    type: 'reference',
                    name: 'work',
                    to: [
                        {
                            type: 'work',
                            components: {
                                preview: CustomContentPreview
                            }
                        }
                    ],
                    options: {
                        disableNew: true
                    }
                })
            ],
            description: `Specify the ${contentType} Custom Content`,
            hidden: ({ parent }) => parent?.contentType !== 'custom',
            validation: (Rule) =>
                Rule.custom((currentValue, context) => {
                    // Ensure context.parent is typed correctly
                    const parent = context.parent as TCollectionGrid | undefined

                    if (parent?.contentType === 'custom' && !currentValue) {
                        return `Specify ${contentType} Custom Content`
                    }

                    return true
                })
        })
    ],
    preview: {
        select: {
            title: 'title',
            type: 'contentType'
        },
        prepare({ title = 'Collection Grid', type = 'type' }) {
            const _type = typesMap[type as keyof typeof typesMap] || type
            return {
                title: `[${contentType} [${_type}]] ${title}`,
                media: CollectionGridIcon
            }
        }
    },
    initialValue: {
        title: contentType,
        contentType: 'post',
        orderBy: 'title',
        orderDirection: 'asc'
    }
})
