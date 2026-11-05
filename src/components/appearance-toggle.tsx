'use client'
/**
 * SlinkyPixels : Appearance Toggle
 * Light, Dark & Auto, as a segmented control like macOS's Appearance setting.
 * ⌘. (Ctrl+. off a Mac) flips between light & dark, on any page
 */
import { ToggleGroup, ToggleGroupItem } from '@ui/toggle-group'
import { type ThemeSelection, useTheme } from '@wrksz/themes/client'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useSyncExternalStore } from 'react'

const appearances: {
    value: ThemeSelection
    label: string
    Icon: typeof Sun
}[] = [
    { value: 'system', label: 'Auto', Icon: Monitor },
    { value: 'light', label: 'Light', Icon: Sun },
    { value: 'dark', label: 'Dark', Icon: Moon }
]

/**
 * The stored theme is only known in the browser, so the server (and the
 * first client render) shows no selection rather than a wrong one
 */
const subscribe = () => () => {}

const AppearanceToggle = () => {
    const { theme, resolvedTheme, setTheme } = useTheme()
    const isMounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false
    )

    /**
     * ⌘. flips to whichever of light & dark isn't showing
     */
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (!(event.metaKey || event.ctrlKey) || event.key !== '.') return
            event.preventDefault()
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [resolvedTheme, setTheme])

    return (
        <ToggleGroup
            aria-label='Appearance'
            value={isMounted ? [theme ?? 'system'] : []}
            onValueChange={([value]) => {
                /**
                 * Pressing the selected item again clears the group: keep it
                 */
                const appearance = appearances.find(
                    (appearance) => appearance.value === value
                )
                if (appearance) setTheme(appearance.value)
            }}
            spacing={0}
            className='rounded-full border p-0.5'>
            {appearances.map(({ value, label, Icon }) => (
                <ToggleGroupItem
                    key={value}
                    value={value}
                    aria-label={label}
                    title={label}
                    size='sm'
                    className='size-7 min-w-0 rounded-full! p-0 text-muted-foreground hover:bg-transparent hover:text-foreground aria-pressed:bg-muted aria-pressed:text-foreground'>
                    <Icon className='size-3.5' />
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}

export default AppearanceToggle
