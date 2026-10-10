/**
 * SlinkyPixels : /work/[slug]/ - Open Graph Image
 * A work item's share card: title, subtitle & its cover screenshot
 */
import { prettifyUrl } from '@/lib/helpers'
import { loadFonts, ShareCard } from '@/lib/og'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { WORK_QUERY } from '@/sanity/lib/queries'
import { ImageResponse } from 'next/og'

const size = {
    width: 1200,
    height: 630
}

const contentType = 'image/png'

const fetchWork = (slug: string) =>
    client.withConfig({ stega: false }).fetch(WORK_QUERY, { slug })

/**
 * Image metadata, for a per-item alt text. When the image itself is served,
 * Next calls this with empty params (only the id matters then), so skip the
 * fetch without a slug
 */
export const generateImageMetadata = async ({
    params
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params
    const work = slug ? await fetchWork(slug) : null

    return [
        {
            id: 'og',
            alt: work
                ? `${work.title} : Work : ${process.env.APP_TITLE!}`
                : process.env.APP_TITLE!,
            size,
            contentType
        }
    ]
}

const OpengraphImage = async ({
    params
}: {
    params: Promise<{ slug: string }>
}) => {
    const { slug } = await params
    const work = await fetchWork(slug)

    /**
     * Cover as a 16:9 JPEG (Satori can't decode WebP/AVIF)
     */
    const cover = work?.image?.asset
        ? urlFor(work.image)
              .width(960)
              .height(540)
              .fit('crop')
              .format('jpg')
              .quality(80)
              .url()
        : null

    return new ImageResponse(
        <ShareCard
            eyebrow='Work'
            title={work?.title ?? process.env.APP_TITLE!}
            subtitle={work?.subtitle}
            image={cover}
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
