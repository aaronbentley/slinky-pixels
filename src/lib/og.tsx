/**
 * SlinkyPixels : Open Graph & icon artwork
 *
 * Shared building blocks for the generated share cards (opengraph-image) and
 * icons (icon, apple-icon), rendered with `next/og` (Satori). Satori can't
 * read CSS variables or oklch, so the dark-theme tokens from globals.css are
 * mirrored here as hex. Fonts are read from the local `geist` package.
 */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Dark theme tokens (globals.css `[data-theme='dark']`)
 */
export const og = {
    background: '#0a0a0a', // neutral-950
    foreground: '#fafafa', // neutral-50
    muted: '#a3a3a3', // neutral-400
    border: 'rgba(255, 255, 255, 0.1)',
    primary: '#c084fc', // purple-400
    secondary: '#38bdf8', // sky-400
    tertiary: '#f472b6' // pink-400
}

export const brandColors = [og.primary, og.secondary, og.tertiary]

export const gradient = `linear-gradient(125deg, ${og.primary}, ${og.secondary}, ${og.tertiary})`

export const gradientText = {
    backgroundImage: gradient,
    backgroundClip: 'text',
    color: 'transparent'
} as const

/**
 * Geist fonts from node_modules, loaded once per server instance
 */
const fontPath = (file: string) =>
    join(process.cwd(), 'node_modules/geist/dist/fonts', file)

let fontsPromise: Promise<
    { name: string; data: ArrayBuffer; weight: 300 | 400 | 600 | 700 }[]
> | null = null

export const loadFonts = () => {
    fontsPromise ??= Promise.all([
        readFile(fontPath('geist-sans/Geist-Light.ttf')),
        readFile(fontPath('geist-sans/Geist-SemiBold.ttf')),
        readFile(fontPath('geist-sans/Geist-Bold.ttf')),
        readFile(fontPath('geist-mono/GeistMono-Regular.ttf'))
    ]).then(([light, semibold, bold, mono]) => [
        { name: 'Geist', data: light.buffer as ArrayBuffer, weight: 300 },
        { name: 'Geist', data: semibold.buffer as ArrayBuffer, weight: 600 },
        { name: 'Geist', data: bold.buffer as ArrayBuffer, weight: 700 },
        { name: 'Geist Mono', data: mono.buffer as ArrayBuffer, weight: 400 }
    ])

    return fontsPromise
}

/**
 * The header colour strip: 48 cells, colour by third, varying opacity
 */
export const ColorStrip = ({ height = 8 }: { height?: number }) => (
    <div style={{ display: 'flex', width: '100%', height }}>
        {Array.from({ length: 48 }, (_, i) => (
            <div
                key={i}
                style={{
                    flex: 1,
                    background: brandColors[Math.floor((i / 48) * 3)],
                    opacity: 0.5 + 0.5 * Math.abs(Math.sin(i * 0.7))
                }}
            />
        ))}
    </div>
)

/**
 * A still of the slinky: a helix laid along an arch, with the travelling
 * wave frozen part-way so it reads as moving. Same maths as `Slinky`
 */
export const Coil = ({
    left,
    top,
    width,
    rings = 12,
    perRing = 14,
    radiusX = 18,
    radiusY = 56,
    arch = 110,
    wave = 16,
    intensity = 0.45
}: {
    left: number
    top: number
    width: number
    rings?: number
    perRing?: number
    radiusX?: number
    radiusY?: number
    arch?: number
    wave?: number
    intensity?: number
}) => (
    <div style={{ display: 'flex', position: 'absolute', left, top }}>
        {Array.from({ length: rings * perRing + 1 }, (_, k) => {
            const s = k / perRing
            const t = ((k % perRing) / perRing) * Math.PI * 2
            const u = s / rings
            const front = Math.cos(t) > 0
            const size = front ? 8 : 5

            return (
                <div
                    key={k}
                    style={{
                        position: 'absolute',
                        left: u * width + radiusX * Math.cos(t),
                        top:
                            -arch * Math.sin(Math.PI * u) +
                            radiusY * Math.sin(t) +
                            wave * Math.sin(u * Math.PI * 2),
                        width: size,
                        height: size,
                        borderRadius: 2,
                        background: brandColors[Math.min(2, Math.floor(u * 3))],
                        opacity: intensity * (front ? 1 : 0.4)
                    }}
                />
            )
        })}
    </div>
)

export type TitlePart = { text: string; gradient?: boolean }

/**
 * A share card in the style of the page heroes: colour strip, mono eyebrow,
 * gradient title, subtitle & wordmark, with the coil behind. An optional
 * image (e.g. a work item's cover) sits on the right
 */
export const ShareCard = ({
    eyebrow,
    title,
    subtitle,
    image,
    siteName,
    siteUrl
}: {
    eyebrow?: string | null
    /**
     * A plain title is all gradient; parts mark just some words (homepage)
     */
    title: string | TitlePart[]
    subtitle?: string | null
    image?: string | null
    siteName: string
    siteUrl: string
}) => {
    const parts =
        typeof title === 'string' ? [{ text: title, gradient: true }] : title

    /**
     * Satori lays out children as flex items, so plain words are separate
     * items that wrap. Gradient parts stay whole so the gradient runs across
     * them once, rather than restarting on every word
     */
    const segments = parts.flatMap(({ text, gradient: isGradient }) =>
        isGradient
            ? [{ text: text.trim(), gradient: true }]
            : text
                  .split(/\s+/)
                  .filter(Boolean)
                  .map((word) => ({ text: word, gradient: false }))
    )

    const titleLength = parts.reduce(
        (total, { text }) => total + text.length,
        0
    )
    const titleSize = image
        ? titleLength > 24
            ? 64
            : 80
        : titleLength > 28
          ? 84
          : 104

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                position: 'relative',
                background: og.background,
                color: og.foreground,
                fontFamily: 'Geist'
            }}>
            <Coil
                left={image ? 560 : 700}
                top={image ? 560 : 470}
                width={image ? 360 : 400}
            />
            <ColorStrip />
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    padding: '56px 72px 52px',
                    gap: 48
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'space-between'
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24
                        }}>
                        {eyebrow && (
                            <div
                                style={{
                                    fontFamily: 'Geist Mono',
                                    fontSize: 22,
                                    color: og.muted
                                }}>
                                {eyebrow}
                            </div>
                        )}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                fontSize: titleSize,
                                fontWeight: 700,
                                lineHeight: 0.98,
                                letterSpacing: '-0.06em',
                                columnGap: titleSize * 0.18,
                                paddingBottom: 8
                            }}>
                            {segments.map(
                                ({ text, gradient: isGradient }, i) => (
                                    <span
                                        key={i}
                                        style={
                                            isGradient
                                                ? {
                                                      ...gradientText,
                                                      paddingRight: 6
                                                  }
                                                : undefined
                                        }>
                                        {text}
                                    </span>
                                )
                            )}
                        </div>
                        {subtitle && (
                            <div
                                style={{
                                    fontSize: 30,
                                    fontWeight: 300,
                                    lineHeight: 1.35,
                                    letterSpacing: '-0.01em',
                                    color: og.muted,
                                    maxWidth: image ? 520 : 680
                                }}>
                                {subtitle}
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 20
                        }}>
                        <div
                            style={{
                                ...gradientText,
                                fontSize: 32,
                                fontWeight: 700,
                                letterSpacing: '-0.05em',
                                paddingRight: 4
                            }}>
                            {siteName}
                        </div>
                        <div
                            style={{
                                fontFamily: 'Geist Mono',
                                fontSize: 20,
                                color: og.muted
                            }}>
                            {siteUrl}
                        </div>
                    </div>
                </div>
                {image && (
                    <div
                        style={{
                            display: 'flex',
                            alignSelf: 'center',
                            width: 480,
                            height: 270,
                            borderRadius: 18,
                            border: `2px solid ${og.border}`,
                            overflow: 'hidden'
                        }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={image}
                            alt=''
                            width={480}
                            height={270}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

/**
 * The app icon: a short pixel slinky seen side-on, loops along a gently
 * arched axis, with bright front pixels over dim back ones, in the brand
 * colours on a near-black tile. Same helix maths as `Slinky`, drawn on a
 * 512px canvas & scaled
 */
const ICON_COIL = {
    rings: 5, // loops along the coil
    perRing: 18, // pixels per loop
    pitch: 52, // distance between loops (less than a loop's width, so they overlap)
    radiusX: 56, // loop half-width, as seen side-on
    radiusY: 104, // loop half-height
    arch: 40, // how high the middle lifts
    front: 26, // front pixel size
    back: 18 // back pixel size
}

const iconPixels = (() => {
    const { rings, perRing, pitch, radiusX, radiusY, arch, front, back } =
        ICON_COIL

    /**
     * Centre the coil on the tile: horizontally across its length & loop
     * width, vertically across its loops & arch
     */
    const startX = (512 - rings * pitch) / 2
    const centreY = 256 + arch / 2

    const pixels = Array.from({ length: rings * perRing + 1 }, (_, k) => {
        const s = k / perRing
        const t = ((k % perRing) / perRing) * Math.PI * 2
        const u = s / rings
        const isFront = Math.cos(t) > 0
        const pixel = isFront ? front : back

        return {
            isFront,
            left: startX + s * pitch + radiusX * Math.cos(t) - pixel / 2,
            top:
                centreY -
                arch * Math.sin(Math.PI * u) +
                radiusY * Math.sin(t) -
                pixel / 2,
            pixel,
            color: brandColors[Math.min(2, Math.floor(u * 3))]
        }
    })

    // Back of the coil first, so the front pixels sit on top
    return [
        ...pixels.filter(({ isFront }) => !isFront),
        ...pixels.filter(({ isFront }) => isFront)
    ]
})()

export const IconArt = ({
    size,
    rounded = true
}: {
    size: number
    rounded?: boolean
}) => {
    const scale = size / 512

    return (
        <div
            style={{
                display: 'flex',
                position: 'relative',
                width: size,
                height: size,
                background: og.background,
                borderRadius: rounded ? 112 * scale : 0
            }}>
            {iconPixels.map(({ isFront, left, top, pixel, color }, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: left * scale,
                        top: top * scale,
                        width: pixel * scale,
                        height: pixel * scale,
                        borderRadius: 6 * scale,
                        background: color,
                        opacity: isFront ? 1 : 0.4
                    }}
                />
            ))}
        </div>
    )
}
