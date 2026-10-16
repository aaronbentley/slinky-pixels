/**
 * SlinkyPixels : Get In Touch
 * A row linking to the Contact Page set in Settings, e.g. at the end of About
 */
import { GetInTouchIcon } from '@/components/icons'
import { defineField, defineType } from 'sanity'

// Define content type
const contentType = 'Get In Touch'

export const GetInTouch = defineType({
    name: 'getInTouch',
    title: contentType,
    type: 'object',
    icon: GetInTouchIcon,
    description: 'Links to the Contact Page set in Settings',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Short label above the Text',
            initialValue: 'Get in touch',
            validation: (Rule) => Rule.required().error('Specify a Title')
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'string',
            description: 'Optional, the line shown in the row',
            initialValue: 'Questions about a project, or just want to say hi?'
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
