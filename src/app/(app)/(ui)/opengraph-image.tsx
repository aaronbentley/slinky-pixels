/**
 * SlinkyPixels : Open Graph Image
 * The homepage share card (also the default for routes in this group
 * without their own).
 * Uses the frontpage headline, with its gradient words, eyebrow & intro.
 */
import { prettifyUrl } from '@/lib/helpers'
import { loadFonts, ShareCard, TitlePart } from '@/lib/og'
import { client } from '@/sanity/lib/client'
import { PAGE_QUERY } from '@/sanity/lib/queries'
import { ImageResponse } from 'next/og'

export const alt = `${process.env.APP_TITLE!} : ${process.env.APP_DESCRIPTION!}`

export const size = {
    width: 1200,
    height: 630
}

export const contentType = 'image/png'

const OpengraphImage = async () => {
    const page = await client
        .withConfig({ stega: false })
        .fetch(PAGE_QUERY, { slug: '/' })

    /**
     * The frontpage block holds the headline, eyebrow & intro
     */
    const frontpage = page?.content?.find(
        (block) => block._type === 'frontpage'
    )

    /**
     * Headline spans, marking those with the gradient decorator
     */
    const headline: TitlePart[] =
        frontpage?.headline?.[0]?.children?.map((span) => ({
            text: span.text ?? '',
            gradient: span.marks?.includes('gradient')
        })) ?? []

    return new ImageResponse(
        <ShareCard
            eyebrow={frontpage?.eyebrow}
            title={
                headline.length > 0 ? headline : process.env.APP_DESCRIPTION!
            }
            subtitle={frontpage?.intro}
            siteName={process.env.APP_TITLE!}
            siteUrl={prettifyUrl(process.env.APP_URL!)}
        />,
        {
            ...size,
            fonts: await loadFonts()
        }
    )
}

export default OpengraphImage
