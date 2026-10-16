/**
 * SlinkyPixels : Contact Links
 * Lists the Email & Social Links marked Professional in Settings, e.g. on Contact
 */
import { ContactLinksIcon } from '@/components/icons'
import { defineField, defineType } from 'sanity'

// Define content type
const contentType = 'Contact Links'

export const ContactLinks = defineType({
    name: 'contactLinks',
    title: contentType,
    type: 'object',
    icon: ContactLinksIcon,
    description:
        'Lists the Email & Social Links marked Professional in Settings',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: `${contentType} Title`,
            initialValue: 'Find me on',
            validation: (Rule) =>
                Rule.required().error(`Specify ${contentType} Title`)
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
