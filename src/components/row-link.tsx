/**
 * SlinkyPixels : Row Link
 * A full-width list row link. On hover the row tints, its inline padding grows
 * and the diagonal arrow turns to the brand gradient & nudges up & right.
 */
import Link from '@/components/link'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

const RowLink = ({
    href,
    target,
    className,
    arrowClassName,
    children,
    ...rest
}: {
    href: string
    target?: string
    className?: string
    arrowClassName?: string
    children: React.ReactNode
    [key: string]: unknown
}) => (
    <Link
        href={href}
        target={target}
        className={cn(
            [
                'group',
                'flex',
                'w-full',
                'items-center',
                'px-1',
                'text-foreground',
                'transition-[background-color,padding]',
                'duration-200',
                'hover:bg-muted',
                'hover:ps-3',
                'hover:text-foreground',
                'focus-visible:bg-muted',
                'focus-visible:ps-3'
            ],
            className
        )}
        {...rest}>
        {children}
        <ArrowUpRight
            aria-hidden='true'
            className={cn(
                [
                    'size-5',
                    'shrink-0',
                    'text-muted-foreground',
                    'transition',
                    'duration-200',
                    // Brand gradient stroke, see IconGradient
                    'group-hover:stroke-[url(#icon-gradient-arrow)]',
                    'group-focus-visible:stroke-[url(#icon-gradient-arrow)]',
                    'group-hover:translate-x-0.75',
                    'group-hover:-translate-y-0.75',
                    'group-focus-visible:translate-x-0.75',
                    'group-focus-visible:-translate-y-0.75'
                ],
                arrowClassName
            )}
        />
    </Link>
)

export default RowLink
