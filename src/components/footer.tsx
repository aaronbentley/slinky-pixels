/**
 * SlinkyPixels : Footer
 */
import { CopyrightIcon } from '@/components/icons'
import SocialLinks from '@/components/social-links'
import { Typography } from '@/components/typography'
import { sanityFetch } from '@/sanity/lib/live'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'

const Footer = async () => {
    /**
     * Get settings
     */
    const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY })

    /**
     * Destructure social links
     */
    const socialLinks = settings?.socialLinks || []

    return (
        <footer className='mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t px-8 py-8'>
            <SocialLinks
                socialLinks={socialLinks}
                className='flex-wrap justify-start'
            />
            <div className='flex flex-row items-center justify-center gap-1.5'>
                <CopyrightIcon className='size-4 stroke-[1.5] text-muted-foreground' />
                <Typography
                    variant='small'
                    muted>
                    {new Date().getFullYear()} {settings?.title}
                </Typography>
            </div>
        </footer>
    )
}

export default Footer
