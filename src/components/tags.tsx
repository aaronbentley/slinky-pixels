/**
 * SlinkyPixels : Tags
 * A wrapping list of mono outline badges, e.g. technologies used
 */
import { cn } from '@/lib/utils'
import { Badge } from '@ui/badge'

const Tags = ({
    tags,
    className
}: {
    tags?: string[] | null
    className?: string
}) => {
    /**
     * Bail if no tags
     */
    if (!tags || tags.length === 0) return null

    return (
        <ul className={cn('flex flex-wrap gap-1.5', className)}>
            {tags.map((tag) => (
                <li key={tag}>
                    <Badge
                        variant='outline'
                        className='h-6 rounded-md bg-background px-2 font-mono text-xs font-normal'>
                        {tag}
                    </Badge>
                </li>
            ))}
        </ul>
    )
}

export default Tags
