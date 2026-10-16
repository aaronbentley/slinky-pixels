/**
 * SlinkyPixels : Sanity : Logo
 * The app icon as an SVG, for the Studio's workspace icon
 */
import { iconPixels, og } from '@/lib/brand'

const Logo = () => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'>
        <rect
            width={512}
            height={512}
            rx={112}
            fill={og.background}
        />
        {iconPixels.map(({ isFront, left, top, pixel, color }, i) => (
            <rect
                key={i}
                x={left}
                y={top}
                width={pixel}
                height={pixel}
                rx={6}
                fill={color}
                opacity={isFront ? 1 : 0.4}
            />
        ))}
    </svg>
)

export default Logo
