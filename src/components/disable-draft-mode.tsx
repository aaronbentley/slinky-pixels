'use client'
/**
 * SlinkyPixels : Disable Draft Mode
 * @description Lets editors leave draft mode when previewing outside Presentation Tool.
 */
import { disableDraftMode } from '@/actions/disable-draft-mode'
import { Button } from '@ui/button'
import { useIsPresentationTool } from 'next-sanity/hooks'
import { useTransition } from 'react'

export const DisableDraftMode = () => {
    const [pending, startTransition] = useTransition()
    const isPresentationTool = useIsPresentationTool()

    // Hide while checking (null) and inside Presentation Tool (true)
    if (isPresentationTool !== false) return null

    return (
        <Button
            type='button'
            size='sm'
            disabled={pending}
            onClick={() => startTransition(() => disableDraftMode())}
            className='fixed right-2 bottom-2 z-50 bg-foreground font-bold text-background hover:bg-foreground/90'>
            {pending ? 'Disabling…' : 'Disable Draft Mode'}
        </Button>
    )
}
