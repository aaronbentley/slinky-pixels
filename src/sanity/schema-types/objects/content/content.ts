/**
 * SlinkyPixels : Content
 */
import camelcase from 'camelcase'
import { defineArrayMember, defineType } from 'sanity'

// Define content type
const contentType = 'Content'

export const Content = defineType({
    name: camelcase(contentType),
    title: contentType,
    type: 'array',
    description: 'Compose Page content',
    of: [
        defineArrayMember({ type: 'frontpage' }),
        defineArrayMember({ type: 'body' }),
        defineArrayMember({ type: 'collectionGrid' }),
        defineArrayMember({ type: 'album' }),
        defineArrayMember({ type: 'getInTouch' }),
        defineArrayMember({ type: 'contactLinks' })
    ],
    options: {
        insertMenu: {
            showIcons: true
        }
    }
})
