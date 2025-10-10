/**
 * SlinkyPixels : Header
 */
import ModeToggle from '@/components/mode-toggle'
import Nav from '@/components/nav'
import { headingBaseClasses } from '@/components/typography'
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
        <header className='sticky top-0 z-50 w-full border-b border-muted bg-background'>
            <div className='container flex items-center'>
                <div className='flex w-full justify-between py-4'>
                    <Nav menu={menu} />
                    {/* <MobileNav menu={menu} /> */}
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
                            'origin-top',
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
                            'backdrop-blur-lg',
                            'pe-px'
                        ])}>
                        {process.env.APP_TITLE!}
                    </Link>
                    <ModeToggle />
                </div>
                {/* <div className='flex items-center md:space-x-4'>
                    <ModeToggle />
                </div> */}
            </div>
        </header>
    )
}

export default Header
