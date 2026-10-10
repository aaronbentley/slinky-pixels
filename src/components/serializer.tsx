/**
 * SlinkyPixels : Portable Text Serializer
 */
import Link from '@/components/link'
import {
    gradientLinkClasses,
    Typography,
    TypographyProps
} from '@/components/typography'
import { resolveLinkURL } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import {
    PortableTextBlockComponent,
    PortableTextReactComponents
} from 'next-sanity'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * Returns h1–h6 block handlers that all forward the same props to Typography.
 * Use as the `block` value when overriding heading styles in a serializer call.
 * Pass `variant` to pin every style (h1–h6) to a single visual size regardless
 * of which heading style is chosen in Sanity — e.g. to keep a locked-down
 * semantic level (via `as`) at a different visual scale.
 *
 * @example
 * serializer({ block: headingBlocks({ display: true, muted: true }) })
 * @example
 * serializer({ block: headingBlocks({ variant: 'h3', as: 'h2' }) })
 */
export const headingBlocks = (
    props: Omit<TypographyProps, 'children'> = {}
) => {
    const heading = (level: HeadingLevel) => {
        const HeadingBlock: PortableTextBlockComponent = ({ children }) => (
            <Typography
                variant={level}
                {...props}>
                {children}
            </Typography>
        )
        return HeadingBlock
    }

    return {
        h1: heading('h1'),
        h2: heading('h2'),
        h3: heading('h3'),
        h4: heading('h4'),
        h5: heading('h5'),
        h6: heading('h6')
    }
}

/**
 * Base serializer for Portable Text
 */
const baseSerializer: Partial<PortableTextReactComponents> = {
    types: {},
    block: {
        normal: ({ children }) => (
            <Typography variant='p'>{children}</Typography>
        ),
        ...headingBlocks(),
        lead: ({ children }) => (
            <Typography variant='lead'>{children}</Typography>
        ),
        blockquote: ({ children }) => (
            <Typography variant='blockquote'>{children}</Typography>
        )
    },
    marks: {
        strong: ({ children }) => (
            <Typography variant='strong'>{children}</Typography>
        ),
        em: ({ children }) => <Typography variant='em'>{children}</Typography>,
        underline: ({ children }) => (
            <Typography variant='underline'>{children}</Typography>
        ),
        'strike-through': ({ children }) => (
            <Typography
                variant='del'
                className='decoration-2'>
                {children}
            </Typography>
        ),
        link: ({ children, value }) => {
            const {
                customUrl = false,
                destinationRef = null,
                destinationHref = '',
                blank = false
            } = value

            // Resolve link destination ref/url
            const href = resolveLinkURL({
                customUrl,
                destinationRef,
                destinationHref
            })

            // Determine link title for accessibility
            const title = href.startsWith('mailto:')
                ? `Email ${href.slice(7)}`
                : href.startsWith('tel:')
                  ? `Call ${href.slice(4)}`
                  : `Visit ${href}`

            return (
                <Link
                    href={href}
                    title={title}
                    target={blank ? '_blank' : '_self'}
                    className={cn(gradientLinkClasses)}>
                    {children}
                </Link>
            )
        }
    },
    list: {
        bullet: ({ children }) => (
            <Typography variant='ul'>{children}</Typography>
        ),
        number: ({ children }) => (
            <Typography variant='ol'>{children}</Typography>
        )
    },
    listItem: {
        bullet: ({ children }) => (
            <Typography variant='li'>{children}</Typography>
        ),
        number: ({ children }) => (
            <Typography variant='li'>{children}</Typography>
        )
    }
}

/**
 * Serializes Portable Text to React components.
 * Overrides are merged with the base serializer — `block` handlers are merged
 * rather than replaced, so partial block overrides preserve base styles.
 *
 * @param overrides - Optional partial serializer config to merge with the base.
 * @returns The merged Portable Text React components.
 */
const serializer = (
    overrides: Partial<PortableTextReactComponents> = {}
): Partial<PortableTextReactComponents> => ({
    ...baseSerializer,
    ...overrides,
    block: {
        ...(baseSerializer.block as object),
        ...(overrides.block as object)
    },
    marks: {
        ...(baseSerializer.marks as object),
        ...(overrides.marks as object)
    },
    list: {
        ...(baseSerializer.list as object),
        ...(overrides.list as object)
    },
    listItem: {
        ...(baseSerializer.listItem as object),
        ...(overrides.listItem as object)
    }
})

export default serializer
