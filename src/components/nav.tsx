'use client'
import { resolveLinkURL } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { MENU_QUERY_RESULT } from '@/sanity/types'
import { StegaBranded } from 'next-sanity'
import { Button } from '@ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuLinkItem,
    DropdownMenuTrigger
} from '@ui/dropdown-menu'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * SlinkyPixels : Nav
 *
 */

const Nav = ({
    menu
}: {
    menu: MENU_QUERY_RESULT | StegaBranded<MENU_QUERY_RESULT>
}) => {
    /**
     * Get the pathname
     */
    const pathname = usePathname()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        size='icon'
                        variant='ghost'
                    />
                }>
                <Menu className='size-[1.2rem]' />
                <span className='sr-only'>Toggle Menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='start'
                className='w-auto'>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
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
                                <DropdownMenuLinkItem
                                    key={_key}
                                    closeOnClick
                                    render={
                                        <Link
                                            href={href}
                                            target={blank ? '_blank' : '_self'}
                                            rel={
                                                blank
                                                    ? 'noopener noreferrer'
                                                    : undefined
                                            }
                                        />
                                    }
                                    aria-current={active ? 'page' : undefined}
                                    className={cn(
                                        'font-medium',
                                        active && [
                                            'text-background',
                                            'bg-secondary',
                                            'focus:text-background',
                                            'focus:bg-secondary/90'
                                        ]
                                    )}>
                                    {label}
                                </DropdownMenuLinkItem>
                            )
                        })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Nav
