/**
 * SlinkyPixels : Work
 */
import { defineField, defineType } from 'sanity'

// Define document type
const documentType = 'Work'

export const Work = defineType({
    name: documentType.toLowerCase(),
    title: documentType,
    type: 'document',
    groups: [
        {
            name: 'content',
            title: 'Content',
            default: true
        },
        {
            name: 'media',
            title: 'Media'
        },
        {
            name: 'seo',
            title: 'SEO'
        }
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: `${documentType} Title`,
            validation: (Rule) =>
                Rule.required().error(`Specify ${documentType} Title`),
            group: 'content'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            description: `${documentType} Subtitle`,
            validation: (Rule) =>
                Rule.required().error(`Specify ${documentType} Subtitle`),
            group: 'content'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: `Generate slug from the ${documentType} Title`,
            group: 'content',
            options: {
                source: 'title',
                maxLength: 96
            }
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
            description: `${documentType} date, used to order Recent Work`,
            group: 'content'
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (Rule) =>
                Rule.required().uri({
                    allowRelative: false, // Allow relative links
                    relativeOnly: false, // Force only relative links
                    scheme: ['https'] // Default is ["https", "http"]
                }),
            group: 'content'
        }),
        defineField({
            name: 'uses',
            title: 'Uses',
            type: 'array',
            of: [{ type: 'string' }],
            description: `Specify the technologies used in this ${documentType}`,
            validation: (Rule) =>
                Rule.required().min(1).error(`Specify at least one technology`),
            options: {
                layout: 'tags'
            },
            group: 'content'
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'content',
            group: 'content',
            validation: (Rule) =>
                Rule.required().error(`Specify ${documentType} Content`)
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: `Specify an image for ${documentType}`,
            group: 'media',
            validation: (Rule) =>
                Rule.required().error(`Specify an image for ${documentType}`),
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
            group: 'seo'
        })
    ],
    preview: {
        select: {
            title: 'title',
            slug: 'slug',
            media: 'image'
        },
        prepare({ title = 'No title', slug = {}, media = {} }) {
            return {
                title: title ?? undefined,
                subtitle:
                    (slug.current ?? undefined)
                        ? `/${documentType.toLowerCase()}/${slug.current}/`
                        : undefined,
                media: media
            }
        }
    }
})
