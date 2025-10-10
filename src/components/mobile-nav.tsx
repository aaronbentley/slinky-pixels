'use client'
/**
 * SlinkyPixels : Mobile Nav
 *
 */
import Link from '@/components/link'
import { headingBaseClasses } from '@/components/typography'
import { resolveLinkURL } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { MENU_QUERYResult } from '@/sanity/types'
import { Button, buttonVariants } from '@ui/button'
import { navigationMenuTriggerStyle } from '@ui/navigation-menu'
import { ScrollArea } from '@ui/scroll-area'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@ui/sheet'
import { Menu } from 'lucide-react'
import { LinkProps, default as NextLink } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const MobileNav = ({ menu }: { menu: MENU_QUERYResult }) => {
    /**
     * Handle the mobile nav state
     */
    const [open, setOpen] = useState(false)

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    size='icon'
                    variant='ghost'>
                    <Menu className='size-[1.2rem]' />
                    <span className='sr-only'>Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side='left'
                className='border-secondary/25 pr-0 pl-8'>
                <SheetHeader className='ps-0'>
                    <SheetTitle asChild>
                        <Link
                            href='/'
                            className={cn([
                                headingBaseClasses,
                                'text-xl',
                                'text-transparent',
                                'bg-linear-125',
                                'from-primary',
                                'via-secondary',
                                'to-tertiary',
                                'bg-clip-text',
                                'transition',
                                'duration-200',
                                'hover:text-transparent',
                                'hover:from-primary-foreground',
                                'hover:via-secondary-foreground',
                                'hover:to-tertiary-foreground',
                                'dark:hover:text-transparent',
                                'dark:hover:from-primary-foreground',
                                'dark:hover:via-secondary-foreground',
                                'dark:hover:to-tertiary-foreground',
                                'tracking-tighter',
                                'backdrop-blur-lg',
                                'pe-px'
                            ])}>
                            {process.env.NEXT_PUBLIC_APP_TITLE!}
                        </Link>
                    </SheetTitle>
                    <SheetDescription className='sr-only'>
                        Navigation Menu
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className='mt-8 mb-4 h-[calc(100vh-8rem)] pb-10'>
                    <div className='flex flex-col space-y-2'>
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
                                    destinationHref:
                                        destinationHref ?? undefined
                                })

                                return (
                                    <MobileLink
                                        key={_key}
                                        href={href}
                                        blank={blank}
                                        className='font-semibold hover:bg-secondary-foreground hover:text-foreground'
                                        onOpenChange={setOpen}>
                                        {label}
                                    </MobileLink>
                                )
                            })}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
    blank?: boolean | null
}

const MobileLink = ({
    href,
    onOpenChange,
    className,
    children,
    blank,
    ...props
}: MobileLinkProps) => {
    const router = useRouter()
    const pathname = usePathname()

    const active = pathname === href

    return (
        <NextLink
            href={href}
            target={blank ? '_blank' : '_self'}
            onClick={() => {
                if (!blank) router.push(href.toString())
                onOpenChange?.(false)
            }}
            onNavigate={() => {
                onOpenChange?.(false)
            }}
            className={cn(
                buttonVariants({ variant: 'ghost' }),
                navigationMenuTriggerStyle(),
                active && [
                    // 'text-background', 'bg-secondary-foreground'
                    'text-transparent',
                    'bg-linear-125',
                    'from-primary-foreground',
                    'via-secondary-foreground',
                    'to-tertiary-foreground',
                    'bg-clip-text',
                    'pointer-events-none'
                ],
                className
            )}
            {...props}>
            {children}
        </NextLink>
    )
}
