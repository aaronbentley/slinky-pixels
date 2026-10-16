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
     * Split social links into professional & personal, professional first
     */
    const socialLinks = settings?.socialLinks || []
    const professionalLinks = socialLinks.filter((link) => link.professional)
    const personalLinks = socialLinks.filter((link) => !link.professional)

    return (
        <footer className='mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t px-8 py-8'>
            <div className='flex flex-wrap items-center gap-x-6 gap-y-4'>
                {professionalLinks.length > 0 && (
                    <SocialLinks
                        socialLinks={professionalLinks}
                        iconClassName='text-foreground'
                    />
                )}
                {professionalLinks.length > 0 && personalLinks.length > 0 && (
                    <span
                        aria-hidden='true'
                        className='h-4 w-px bg-border'
                    />
                )}
                {personalLinks.length > 0 && (
                    <SocialLinks
                        socialLinks={personalLinks}
                        className='flex-wrap justify-start'
                    />
                )}
            </div>
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
