/**
 * SlinkyPixels : Icon Gradient
 *
 * Brand gradient for SVG icon strokes, rendered once per page. SVG strokes
 * can't use `bg-clip-text`, so icons reference this gradient by id, e.g.
 * `group-hover:stroke-[url(#icon-gradient)]`. It uses `userSpaceOnUse` across
 * the icons' 24x24 viewBox (matching `bg-linear-125`), as straight lines have
 * no bounding box for `objectBoundingBox` to fill. `icon-gradient-arrow`
 * is the same gradient fitted to arrow icons, which only cover the middle of
 * the grid and would otherwise show mostly the middle colour.
 */
const IconGradient = () => (
    <svg
        aria-hidden='true'
        focusable='false'
        className='pointer-events-none absolute size-0 overflow-hidden'>
        <defs>
            <linearGradient
                id='icon-gradient'
                gradientUnits='userSpaceOnUse'
                x1='-1.69'
                y1='2.41'
                x2='25.69'
                y2='21.59'>
                <stop
                    offset='0%'
                    style={{ stopColor: 'var(--primary)' }}
                />
                <stop
                    offset='50%'
                    style={{ stopColor: 'var(--secondary)' }}
                />
                <stop
                    offset='100%'
                    style={{ stopColor: 'var(--tertiary)' }}
                />
            </linearGradient>
            {/* Fitted to arrow icons, which span ~5-19 of the 24px grid */}
            <linearGradient
                id='icon-gradient-arrow'
                href='#icon-gradient'
                x1='4.01'
                y1='6.4'
                x2='19.99'
                y2='17.6'
            />
        </defs>
    </svg>
)

export default IconGradient
