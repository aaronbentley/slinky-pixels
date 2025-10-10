'use client'
import { DropdownMenuLabel } from '@/components/dropdown-menu'
import { cn } from '@/lib/utils'
/**
 * SlinkyPixels : Mode Toggle
 */
import { Button } from '@ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const ModeToggle = () => {
    /**
     * Theme hook from next-themes
     */
    const { theme, setTheme } = useTheme()

    /**
     * Create theme map
     */
    const themeMap = {
        light: 'Light',
        dark: 'Dark',
        system: 'System'
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size='icon'
                    variant='ghost'
                    className='w-9 px-0'>
                    <Sun className='size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                    <Moon className='absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel className='text-muted-foreground'>
                    Theme
                </DropdownMenuLabel>
                {Object.entries(themeMap).map(([key, value]) => {
                    // Check if the menu is active
                    const active = theme === key
                    return (
                        <DropdownMenuItem
                            key={key}
                            onClick={() => setTheme(key)}
                            className={cn(
                                'font-medium',
                                active && [
                                    'text-background',
                                    'bg-secondary',
                                    'focus:text-background',
                                    'focus:bg-secondary/90'
                                ]
                            )}>
                            {value}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ModeToggle
