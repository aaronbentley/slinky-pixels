/**
 * SlinkyPixels : Sanity : Gradient Decorator
 * Studio preview for the `gradient` Portable Text decorator. The Studio does not
 * load globals.css, so the brand gradient (Purple / Sky / Pink 600) is inlined.
 */
import { BlockDecoratorProps } from 'sanity'

export const GradientDecorator = ({ children }: BlockDecoratorProps) => (
    <span
        style={{
            backgroundImage:
                'linear-gradient(125deg, oklch(55.8% 0.288 302.321), oklch(58.8% 0.158 241.966), oklch(59.2% 0.249 0.584))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
        }}>
        {children}
    </span>
)
