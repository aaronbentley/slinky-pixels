'use client'
import { isActivePath, resolveMenuLinks } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { MENU_QUERY_RESULT } from '@/sanity/types'
import { StegaBranded } from 'next-sanity'
import { Button, buttonVariants } from '@ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

/**
 * SlinkyPixels : Nav
 * Inline links from `md` up, a side sheet menu below
 */

const Nav = ({
    menu,
    children
}: {
    menu: MENU_QUERY_RESULT | StegaBranded<MENU_QUERY_RESULT>
    /**
     * Header actions, rendered between the inline links & the mobile menu button
     */
    children?: React.ReactNode
}) => {
    /**
     * Get the pathname
     */
    const pathname = usePathname()

    /**
     * Mobile menu open state, closed on navigation
     */
    const [open, setOpen] = useState(false)

    /**
     * Resolve valid menu links, active on their page & any nested below it
     */
    const links = resolveMenuLinks(menu?.links).map(({ blank, ...link }) => ({
        ...link,
        active: isActivePath(pathname, link.href),
        target: blank ? '_blank' : '_self',
        rel: blank ? 'noopener noreferrer' : undefined
    }))

    /**
     * Bail if no menu links
     */
    if (links.length === 0) return children

    return (
        <>
            <nav
                aria-label='Primary'
                className='hidden items-center gap-1 md:flex'>
                {links.map(({ _key, label, href, active, target, rel }) => (
                    <Link
                        key={_key}
                        href={href}
                        target={target}
                        rel={rel}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            'h-10 px-3',
                            active && 'bg-muted font-semibold'
                        )}>
                        {label}
                    </Link>
                ))}
            </nav>
            {children}
            <Sheet
                open={open}
                onOpenChange={setOpen}>
                <SheetTrigger
                    render={
                        <Button
                            variant='ghost'
                            className='size-10 md:hidden'
                        />
                    }>
                    <Menu className='size-4.8' />
                    <span className='sr-only'>Open menu</span>
                </SheetTrigger>
                <SheetContent
                    side='right'
                    className='md:hidden'>
                    <SheetHeader className='px-6 pt-5'>
                        <SheetTitle className='font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase'>
                            Menu
                        </SheetTitle>
                    </SheetHeader>
                    <nav
                        aria-label='Primary'
                        className='flex flex-col px-6'>
                        {links.map(
                            ({ _key, label, href, active, target, rel }) => (
                                <Link
                                    key={_key}
                                    href={href}
                                    target={target}
                                    rel={rel}
                                    aria-current={active ? 'page' : undefined}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        'rounded-sm border-b py-3 text-2xl/tight font-semibold tracking-tighter transition-colors duration-200 outline-none first:border-t hover:text-secondary focus-visible:ring-3 focus-visible:ring-ring/50',
                                        active && 'text-secondary'
                                    )}>
                                    {label}
                                </Link>
                            )
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default Nav
