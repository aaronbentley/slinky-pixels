/**
 * SlinkyPixels : Get In Touch
 * A row linking to the Contact Page set in Settings, styled like the work
 * items' Next project row
 */
import RowLink from '@/components/row-link'
import { Typography } from '@/components/typography'
import { resolveDocumentReferenceURL } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { sanityFetch } from '@/sanity/lib/live'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'

const GetInTouch = async ({
    title = 'Get in touch',
    text = 'Questions about a project, or just want to say hi?',
    className
}: {
    title?: string | null
    text?: string | null
    className?: string
}) => {
    /**
     * Get the Contact Page from settings
     */
    const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY })
    const contactPage = settings?.contactPage

    /**
     * Bail if no Contact Page is set
     */
    if (!contactPage?.slug?.current) return null

    return (
        <RowLink
            href={resolveDocumentReferenceURL(
                contactPage._type,
                contactPage.slug
            )}
            arrowClassName='size-7 group-hover:translate-x-1.25 group-hover:-translate-y-1.25 group-focus-visible:translate-x-1.25 group-focus-visible:-translate-y-1.25'
            className={cn(
                'flex-wrap justify-between gap-x-6 gap-y-3 border-b py-7 hover:px-4 focus-visible:px-4',
                className
            )}>
            <span className='flex flex-col gap-2'>
                <Typography variant='label'>{title}</Typography>
                {text && (
                    <span className='text-[1.75rem]/[1.15] font-semibold tracking-tighter'>
                        {text}
                    </span>
                )}
            </span>
        </RowLink>
    )
}

export default GetInTouch
