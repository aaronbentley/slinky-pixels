/**
 * SlinkyPixels : Icon
 * The pixel coil mark on a rounded near-black tile
 */
import { IconArt } from '@/lib/og'
import { ImageResponse } from 'next/og'

export const size = {
    width: 512,
    height: 512
}

export const contentType = 'image/png'

const Icon = () =>
    new ImageResponse(<IconArt size={size.width} />, {
        ...size
    })

export default Icon
