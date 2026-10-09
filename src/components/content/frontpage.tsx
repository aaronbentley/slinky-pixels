/**
 * SlinkyPixels : Content : Frontpage
 */
import Link from '@/components/link'
import { Typography } from '@/components/typography'
import { resolveLinkURL } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@ui/button'

const Frontpage = ({
    id,
    order,
    title,
    content,
    buttons
}: {
    id: string
    order: number
    title?: string
    content?: string
    buttons?: {
        _key: string
        label: string
        customUrl?: boolean
        destinationRef?:
            | { _type: string; title: string; slug: { current: string } }
            | undefined
            | null
        destinationHref?: string
        blank?: boolean
    }[]
}) => {
    return (
        <div
            id={id}
            data-order={order}
            className={cn([
                'container',
                'flex',
                'flex-1',
                'flex-col',
                'gap-y-2',
                'items-center',
                'justify-center'
            ])}>
            <Typography
                variant='h1'
                display
                className={cn([
                    'px-2',
                    'text-transparent',
                    'bg-linear-125',
                    'from-primary',
                    'via-secondary',
                    'to-tertiary',
                    'bg-clip-text'
                ])}>
                {title}
            </Typography>
            <Typography
                variant='lead'
                weight='light'
                className={cn(['tracking-tighter'])}
                muted>
                {content}
            </Typography>
            {buttons && buttons.length > 0 && (
                <div className='mt-4 flex flex-wrap justify-center gap-3'>
                    {buttons.map((link) => {
                        /**
                         * Destructure link properties
                         */
                        const {
                            _key,
                            blank,
                            customUrl,
                            destinationRef,
                            destinationHref,
                            label
                        } = link

                        /**
                         * Verify link properties
                         */
                        if (
                            !label ||
                            !destinationRef ||
                            (customUrl && !destinationHref)
                        )
                            return null

                        /**
                         * Resolve link item URL
                         */
                        const href = resolveLinkURL({
                            customUrl,
                            destinationRef,
                            destinationHref
                        })

                        return (
                            <Link
                                key={_key}
                                target={blank ? '_blank' : '_self'}
                                href={href}
                                className={cn(
                                    buttonVariants({
                                        variant: 'secondary',
                                        size: 'lg'
                                    }),
                                    'text-background',
                                    'min-w-24',
                                    'hover:text-background'
                                )}>
                                {label}
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Frontpage
