/**
 * SlinkyPixels : Marker
 * A small square in the brand colours, cycling primary → secondary → tertiary
 */
import { cn } from '@/lib/utils'

const markerColors = ['bg-primary', 'bg-secondary', 'bg-tertiary']

const Marker = ({
    index = 0,
    className
}: {
    index?: number
    className?: string
}) => (
    <span
        aria-hidden='true'
        className={cn(
            'size-2 shrink-0',
            markerColors[index % markerColors.length],
            className
        )}
    />
)

export default Marker
