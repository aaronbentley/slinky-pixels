'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/dropdown-menu'
import { Button } from '@/components/ui/button'
import { resolveLinkURL } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { MENU_QUERYResult } from '@/sanity/types'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * SlinkyPixels : Nav
 *
 */

const Nav = ({ menu }: { menu: MENU_QUERYResult }) => {
    /**
     * Get the pathname
     */
    const pathname = usePathname()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size='icon'
                    variant='ghost'>
                    <Menu className='size-[1.2rem]' />
                    <span className='sr-only'>Toggle Menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side='top'
                align='start'>
                <DropdownMenuLabel className='text-muted-foreground'>
                    Menu
                </DropdownMenuLabel>
                {menu &&
                    menu.links &&
                    menu?.links.map((link) => {
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
                         * Resolve menu item URL
                         */
                        const href = resolveLinkURL({
                            customUrl: customUrl ?? undefined,
                            destinationRef: destinationRef ?? undefined,
                            destinationHref: destinationHref ?? undefined
                        })

                        // Check if the menu is active
                        const active = pathname === href

                        return (
                            <DropdownMenuItem
                                key={_key}
                                asChild>
                                <Link
                                    href={href}
                                    target={blank ? '_blank' : '_self'}
                                    rel={
                                        blank
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    className={cn(
                                        'cursor-pointer',
                                        'font-medium',
                                        active && [
                                            'text-background',
                                            'bg-secondary',
                                            'focus:text-background',
                                            'focus:bg-secondary/90'
                                        ]
                                    )}>
                                    {label}
                                </Link>
                            </DropdownMenuItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Nav
