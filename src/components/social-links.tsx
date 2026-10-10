/**
 * SlinkyPixels : Social Links
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
import Link from '@/components/link'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'

/**
 * Social icons map
 */
const socialIcons: Record<string, React.FC<{ className?: string }>> = {
    X: X,
    Instagram: Instagram,
    GitHub: GitHub,
    Reddit: Reddit,
    Threads: Threads,
    Facebook: Facebook,
    Youtube: Youtube,
    LinkedIn: Linkedin,
    'Apple Music': AppleMusic,
    Xbox: XboxIcon
}

/**
 * Brand gradient for icon strokes on hover. SVG strokes can't use
 * `bg-clip-text`, so icons reference this gradient by id. It uses
 * `userSpaceOnUse` across the icons' 24x24 viewBox (matching `bg-linear-125`)
 * as straight lines have no bounding box for `objectBoundingBox` to fill.
 */
const GRADIENT_ID = 'social-links-gradient'

const IconGradient = () => (
    <svg
        aria-hidden='true'
        focusable='false'
        className='pointer-events-none absolute size-0 overflow-hidden'>
        <defs>
            <linearGradient
                id={GRADIENT_ID}
                gradientUnits='userSpaceOnUse'
                x1='-1.69'
                y1='2.41'
                x2='25.69'
                y2='21.59'>
                <stop
                    offset='0%'
                    style={{ stopColor: 'var(--primary)' }}
                />
                <stop
                    offset='50%'
                    style={{ stopColor: 'var(--secondary)' }}
                />
                <stop
                    offset='100%'
                    style={{ stopColor: 'var(--tertiary)' }}
                />
            </linearGradient>
        </defs>
    </svg>
)

const SocialLinks = ({
    socialLinks,
    className
}: {
    socialLinks:
        { _key: string; name?: string | null; url?: string | null }[] | null
    className?: string
}) => {
    return (
        <div
            className={cn(
                ['flex', 'flex-row', 'items-center', 'justify-center', 'gap-4'],
                className
            )}>
            <IconGradient />
            {socialLinks &&
                socialLinks.map((socialLink) => {
                    if (!socialLink.name || !socialLink.url) return null

                    // Clean stega encoding before using the name as a lookup key
                    const name = stegaClean(socialLink.name)
                    const Icon = socialIcons[name]

                    if (!Icon) return null

                    return (
                        <Link
                            href={socialLink.url}
                            key={socialLink._key}
                            title={`Say hi on ${name}`}
                            aria-label={`Say hi on ${name}`}
                            rel='noopener noreferrer'
                            target='_blank'
                            className='group'>
                            <Icon className='size-4 origin-bottom text-muted-foreground transition-transform duration-200 group-hover:scale-150 group-hover:stroke-[url(#social-links-gradient)] group-focus-visible:scale-150 group-focus-visible:stroke-[url(#social-links-gradient)]' />
                        </Link>
                    )
                })}
        </div>
    )
}

export default SocialLinks
