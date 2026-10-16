/**
 * SlinkyPixels : Content : Contact Links
 * Numbered rows for the Email & Social Links marked Professional in
 * Settings, e.g. on the Contact page
 */
import RowLink from '@/components/row-link'
import { Typography } from '@/components/typography'
import { padNumber, prettifyUrl } from '@/lib/helpers'
import { fadeUp, stagger } from '@/lib/motion'
import { sanityFetch } from '@/sanity/lib/live'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'
import * as motion from 'motion/react-client'
import { stegaClean } from 'next-sanity'

const ContactLinks = async ({
    id,
    order,
    title
}: {
    id: string
    order: number
    title?: string | null
}) => {
    /**
     * Get the Email & professional Social Links from settings, Email first
     */
    const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY })
    const email = settings?.email ? stegaClean(settings.email) : null
    const links = [
        ...(email
            ? [
                  {
                      key: 'email',
                      name: 'Email',
                      href: `mailto:${email}`,
                      display: email,
                      external: false
                  }
              ]
            : []),
        ...(settings?.socialLinks ?? [])
            .filter((link) => link.professional && link.url)
            .map((link) => ({
                key: link._key,
                name: link.name,
                href: link.url,
                display: prettifyUrl(stegaClean(link.url)),
                external: true
            }))
    ]

    /**
     * Bail if there are no links
     */
    if (links.length === 0) return null

    return (
        <section
            id={id}
            data-order={order}
            aria-labelledby={title ? `${id}-heading` : undefined}
            className='mx-auto flex w-full max-w-7xl flex-col gap-3 px-8'>
            {title && (
                <Typography
                    variant='label'
                    as='h2'
                    id={`${id}-heading`}>
                    {title}
                </Typography>
            )}
            <motion.ul
                initial='hidden'
                animate='show'
                variants={stagger()}
                className='flex flex-col border-t border-foreground'>
                {links.map((link, index) => (
                    <motion.li
                        key={link.key}
                        variants={fadeUp}
                        className='border-b'>
                        <RowLink
                            href={link.href}
                            {...(link.external && {
                                target: '_blank',
                                rel: 'noopener noreferrer'
                            })}
                            className='min-h-16 gap-4'>
                            <span className='w-6 font-mono text-xs text-muted-foreground'>
                                {padNumber(index + 1)}
                            </span>
                            <span className='flex-1 text-2xl/tight font-semibold tracking-tighter'>
                                {link.name}
                            </span>
                            <span className='hidden text-[15px] text-muted-foreground sm:block'>
                                {link.display}
                            </span>
                        </RowLink>
                    </motion.li>
                ))}
            </motion.ul>
        </section>
    )
}

export default ContactLinks
