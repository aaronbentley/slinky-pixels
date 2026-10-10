'use client'
/**
 * SlinkyPixels : Mode Toggle
 */
import { Button } from '@ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from '@ui/dropdown-menu'
import { useTheme } from '@wrksz/themes/client'
import { Moon, Sun } from 'lucide-react'

/**
 * Create theme map
 */
const themeMap = {
    light: 'Light',
    dark: 'Dark',
    system: 'System'
}

const ModeToggle = () => {
    /**
     * Theme hook from @wrksz/themes
     */
    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        size='icon'
                        variant='ghost'
                        className='size-10'
                    />
                }>
                <Sun className='size-4.8 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                <Moon className='size-4.8 absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                <span className='sr-only'>Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                className='w-auto'>
                <DropdownMenuRadioGroup
                    value={theme ?? 'system'}
                    onValueChange={(value) => setTheme(value)}>
                    <DropdownMenuLabel>Theme</DropdownMenuLabel>
                    {Object.entries(themeMap).map(([key, value]) => (
                        <DropdownMenuRadioItem
                            key={key}
                            value={key}
                            closeOnClick
                            className='font-medium data-checked:bg-secondary data-checked:text-background data-checked:focus:bg-secondary/90 data-checked:focus:text-background'>
                            {value}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ModeToggle
