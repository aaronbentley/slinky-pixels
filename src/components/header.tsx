/**
 * SlinkyPixels : Header
 */
import ColorStrip from '@/components/color-strip'
import ModeToggle from '@/components/mode-toggle'
import Nav from '@/components/nav'
import {
    gradientTextClasses,
    headingBaseClasses
} from '@/components/typography'
import { cn } from '@/lib/utils'
import { sanityFetch } from '@/sanity/lib/live'
import { MENU_QUERY } from '@/sanity/lib/queries'
import Link from 'next/link'

const Header = async () => {
    /**
     * Fetch menu & menu links
     */
    const { data: menu } = await sanityFetch({
        query: MENU_QUERY,
        params: { title: 'Nav Menu' }
    })

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background'>
            <ColorStrip />
            <div className='mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-8 py-3.5'>
                <Link
                    href='/'
                    className={cn([
                        headingBaseClasses,
                        gradientTextClasses,
                        'text-xl',
                        'transition',
                        'origin-left',
                        'duration-200',
                        'hover:scale-110',
                        'hover:text-transparent',
                        'hover:from-primary-foreground',
                        'hover:via-secondary-foreground',
                        'hover:to-tertiary-foreground',
                        'dark:hover:text-transparent',
                        'dark:hover:from-primary-foreground',
                        'dark:hover:via-secondary-foreground',
                        'dark:hover:to-tertiary-foreground',
                        'tracking-tighter',
                        'pe-px'
                    ])}>
                    {process.env.APP_TITLE!}
                </Link>
                <div className='flex items-center gap-1'>
                    <Nav menu={menu}>
                        <ModeToggle />
                    </Nav>
                </div>
            </div>
        </header>
    )
}

export default Header
