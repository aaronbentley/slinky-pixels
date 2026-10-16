/**
 * SlinkyPixels : Page
 */
import { FrontPageIcon, PageIcon } from '@/components/icons'
import { defineField, defineType } from 'sanity'

// Define document type
const documentType = 'Page'

export const Page = defineType({
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
            validation: (Rule) =>
                Rule.required().error(`Specify ${documentType} Slug`),
            readOnly: ({ document }) => document?._id === 'frontpage',
            hidden: ({ document }) => {
                if (document?._id === 'frontpage') return true
                return !document?.title
            },
            options: {
                source: 'title',
                maxLength: 96
            },
            initialValue: ({ document }) => {
                if (document?._id === 'frontpage') return { current: '/' }
                return { current: '' }
            }
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'content',
            group: 'content',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: `Optional cover image shown below the ${documentType} title`,
            group: 'media',
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
            id: '_id',
            title: 'title',
            slug: 'slug',
            image: 'image'
        },
        prepare({ id = '', title = 'No title', slug = {}, image = {} }) {
            return {
                title: title ?? undefined,
                subtitle: id.includes('frontpage')
                    ? slug.current
                    : slug.current !== undefined
                      ? `/${slug.current}/`
                      : undefined,
                media: id.includes('frontpage')
                    ? FrontPageIcon
                    : image || PageIcon
            }
        }
    }
})
