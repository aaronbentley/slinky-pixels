import { Category } from '@/sanity/schema-types/documents/category'
import { Menu } from '@/sanity/schema-types/documents/menu'
import { Page } from '@/sanity/schema-types/documents/page'
import { Post } from '@/sanity/schema-types/documents/post'
import { Settings } from '@/sanity/schema-types/documents/settings'
import { Work } from '@/sanity/schema-types/documents/work'
import { BasicPortableText } from '@/sanity/schema-types/objects/basic-portable-text'
import { BodyPortableText } from '@/sanity/schema-types/objects/body-portable-text'
import { Album } from '@/sanity/schema-types/objects/content/album'
import { Body } from '@/sanity/schema-types/objects/content/body'
import { CollectionGrid } from '@/sanity/schema-types/objects/content/collection-grid'
import { ContactLinks } from '@/sanity/schema-types/objects/content/contact-links'
import { Content } from '@/sanity/schema-types/objects/content/content'
import { Frontpage } from '@/sanity/schema-types/objects/content/frontpage'
import { GetInTouch } from '@/sanity/schema-types/objects/content/get-in-touch'
import { Details } from '@/sanity/schema-types/objects/details'
import { Link } from '@/sanity/schema-types/objects/link'
import { Seo } from '@/sanity/schema-types/objects/seo'
import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        Album,
        BasicPortableText,
        Body,
        BodyPortableText,
        Category,
        CollectionGrid,
        ContactLinks,
        Content,
        Details,
        Frontpage,
        GetInTouch,
        Link,
        Menu,
        Page,
        Post,
        Seo,
        Settings,
        Work
    ]
}
