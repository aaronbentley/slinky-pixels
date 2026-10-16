/**
 * SlinkyPixels : Brand
 *
 * Brand colours & the app icon geometry, shared by the `next/og` artwork
 * (og.tsx) and the Sanity Studio logo. Kept free of Node APIs so the Studio
 * can import it in the browser.
 */

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

export const iconPixels = (() => {
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
