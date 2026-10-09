/**
 * SlinkyPixels : Link Component, composes Next Link
 */
import { cn } from '@/lib/utils'
import { default as NextLink } from 'next/link'

const Link = ({
    children,
    href,
    target = '_self',
    className,
    ...rest
}: {
    children?: React.ReactNode
    href: string
    target?: string
    className?: string
    scroll?: boolean
    [key: string]: unknown
}) => {
    /**
     * Build array of link styles
     */
    const linkStyles = [
        'transition-colors',
        'duration-200',
        'text-secondary-foreground',
        'cursor-pointer',
        'inline-block',
        'w-fit',
        'hover:text-secondary'
    ]

    /**
     * Bail early if href is not provided
     */
    if (!href) return null

    /**
     * Check if href is relative or absolute
     * 1. starts with 'http:' or 'mailto:' or 'tel:'
     * 2. does not start with /
     * 3. does not start with full APP_URL from .env
     */
    const isExternal =
        (href.startsWith('http') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:')) &&
        !href.startsWith('/') &&
        !href.startsWith(process.env.APP_URL!)

    /**
     * Check if href is a hash link
     */
    const isHash = href.startsWith('#')

    /**
     * Render external link
     */
    if (isExternal || isHash) {
        return (
            <a
                href={href}
                target={target}
                rel='noopener noreferrer'
                {...rest}
                className={cn(...linkStyles, className)}>
                {children}
            </a>
        )
    }

    /**
     * Render internal link
     */
    return (
        <NextLink
            href={href}
            target={target}
            className={cn(...linkStyles, className)}
            {...rest}>
            {children}
        </NextLink>
    )
}

export default Link
