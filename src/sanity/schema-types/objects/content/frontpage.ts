/**
 * SlinkyPixels : Frontpage
 */
import { FrontPageIcon, GradientIcon } from '@/components/icons'
import { GradientDecorator } from '@/sanity/gradient-decorator'
import { defineArrayMember, defineField, defineType } from 'sanity'

// Define content type
const contentType = 'Frontpage'

export const Frontpage = defineType({
    name: contentType.toLowerCase(),
    title: contentType,
    type: 'object',
    icon: FrontPageIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: `${contentType} Title`,
            validation: (Rule) =>
                Rule.required().error(`Specify ${contentType} Title`),
            initialValue: process.env.NEXT_PUBLIC_APP_TITLE
        }),
        defineField({
            name: 'eyebrow',
            title: 'Eyebrow',
            type: 'string',
            description: 'Optional, short line shown above the Headline'
        }),
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'array',
            description:
                'Select words and apply the Gradient decorator to highlight them',
            of: [
                defineArrayMember({
                    type: 'block',
                    styles: [{ title: 'Normal', value: 'normal' }],
                    lists: [],
                    marks: {
                        decorators: [
                            {
                                title: 'Gradient',
                                value: 'gradient',
                                icon: GradientIcon,
                                component: GradientDecorator
                            }
                        ],
                        annotations: []
                    }
                })
            ],
            validation: (Rule) =>
                Rule.required()
                    .max(1)
                    .error(`Specify a single paragraph ${contentType} Headline`)
        }),
        defineField({
            name: 'intro',
            title: 'Intro',
            type: 'text',
            description: 'Optional, supporting line shown below the Headline',
            rows: 2
        }),
        defineField({
            name: 'buttons',
            title: 'Buttons',
            type: 'array',
            of: [{ type: 'link' }],
            description: `Add up to 3 links, shown as the numbered pages index`,
            validation: (Rule) =>
                Rule.max(3).error('You can add up to 3 buttons only')
        }),
        defineField({
            name: 'showRecentWork',
            title: 'Show Recent Work?',
            type: 'boolean',
            description: 'List the most recent Work, ordered by Work date',
            initialValue: true
        }),
        defineField({
            name: 'recentWorkCount',
            title: 'Recent Work Count',
            type: 'number',
            description: 'Number of Work items to list',
            initialValue: 5,
            hidden: ({ parent }) => parent?.showRecentWork === false,
            validation: (Rule) =>
                Rule.integer()
                    .min(1)
                    .max(10)
                    .error('Specify a Recent Work Count between 1 and 10')
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
