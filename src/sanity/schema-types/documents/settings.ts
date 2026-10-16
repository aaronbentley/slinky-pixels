/**
 * SlinkyPixels : Settings
 */

import {
    AppleMusic,
    Facebook,
    GitHub,
    Instagram,
    Linkedin,
    Reddit,
    Threads,
    X,
    XboxIcon,
    Youtube
} from '@/components/icons'
import { defineField, defineType } from 'sanity'

// Define document type
const documentType = 'Settings'

// Define social icons map
const socialIconsMap: Record<string, React.FC> = {
    X: X,
    Instagram: Instagram,
    GitHub: GitHub,
    Reddit: Reddit,
    Threads: Threads,
    Youtube: Youtube,
    Facebook: Facebook,
    LinkedIn: Linkedin,
    'Apple Music': AppleMusic,
    Xbox: XboxIcon
}

export const Settings = defineType({
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
            name: 'brand',
            title: 'Brand'
        },
        {
            name: 'contact',
            title: 'Contact'
        }
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
            description: 'Specify Site Title',
            validation: (Rule) => Rule.required().error('Specify Site title'),
            group: 'content'
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
            description: 'Specify Site Description',
            rows: 4,
            validation: (Rule) =>
                Rule.required().error('Specify Site description'),
            group: 'content'
        }),
        defineField({
            name: 'url',
            title: 'Site URL',
            type: 'url',
            description: 'Specify Site URL',
            validation: (Rule) =>
                Rule.required().uri({
                    allowRelative: false,
                    scheme: ['http', 'https']
                }),
            group: 'content'
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'email',
            description: 'Listed first on the Contact Page',
            group: 'contact'
        }),
        defineField({
            name: 'contactPage',
            title: 'Contact Page',
            type: 'reference',
            to: [{ type: 'page' }],
            description: 'Where the Get In Touch rows link to',
            options: {
                disableNew: true
            },
            group: 'contact'
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            description: 'Social Links contact points',
            of: [
                {
                    name: 'socialLink',
                    title: 'Social Link',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            type: 'string',
                            title: 'Social Platform',
                            validation: (Rule) =>
                                Rule.required().error(
                                    'Specify Social Link Name'
                                ),
                            initialValue: '',
                            options: {
                                list: [
                                    'X',
                                    'Instagram',
                                    'GitHub',
                                    'Reddit',
                                    'Threads',
                                    'Facebook',
                                    'Youtube',
                                    'LinkedIn',
                                    'Apple Music',
                                    'Xbox'
                                ]
                            }
                        }),
                        defineField({
                            name: 'url',
                            type: 'url',
                            title: 'URL',
                            validation: (Rule) =>
                                Rule.required().error('Specify Social Link URL')
                        }),
                        defineField({
                            name: 'professional',
                            type: 'boolean',
                            title: 'Professional?',
                            description:
                                'Listed first in the footer & on the Contact Page',
                            initialValue: false
                        })
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'url',
                            professional: 'professional'
                        },
                        prepare({ title, subtitle, professional }) {
                            if (!title) {
                                return {
                                    title: 'No Title'
                                }
                            }

                            // Get icon component
                            const Icon = socialIconsMap[title]

                            return {
                                title: professional
                                    ? `${title} (Professional)`
                                    : (title ?? 'No title'),
                                subtitle: subtitle ?? 'No URL',
                                media: Icon ?? null
                            }
                        }
                    }
                }
            ],
            validation: (Rule) =>
                Rule.unique().error('No duplicate Social Links'),
            group: 'contact'
        })
    ]
})
