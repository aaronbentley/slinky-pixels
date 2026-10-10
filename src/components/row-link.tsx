/**
 * SlinkyPixels : Row Link
 * A full-width list row link. On hover the row tints, its inline padding grows
 * and the arrow turns to the brand gradient & nudges in its direction.
 */
import Link from '@/components/link'
import { cn } from '@/lib/utils'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const arrows = {
    right: {
        Icon: ArrowRight,
        classes: [
            'group-hover:translate-x-1',
            'group-focus-visible:translate-x-1'
        ]
    },
    'up-right': {
        Icon: ArrowUpRight,
        classes: [
            'group-hover:translate-x-0.75',
            'group-hover:-translate-y-0.75',
            'group-focus-visible:translate-x-0.75',
            'group-focus-visible:-translate-y-0.75'
        ]
    }
}

const RowLink = ({
    href,
    arrow,
    target,
    className,
    arrowClassName,
    children,
    ...rest
}: {
    href: string
    arrow?: keyof typeof arrows
    target?: string
    className?: string
    arrowClassName?: string
    children: React.ReactNode
    [key: string]: unknown
}) => {
    const { Icon, classes } = arrow ? arrows[arrow] : arrows.right

    return (
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
            {arrow && (
                <Icon
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
                            'group-focus-visible:stroke-[url(#icon-gradient-arrow)]'
                        ],
                        classes,
                        arrowClassName
                    )}
                />
            )}
        </Link>
    )
}

export default RowLink
