/**
 * SlinkyPixels : Apple Icon
 * Full-bleed tile, as iOS applies its own rounded mask
 */
import { IconArt } from '@/lib/og'
import { ImageResponse } from 'next/og'

export const size = {
    width: 180,
    height: 180
}

export const contentType = 'image/png'

const AppleIcon = () =>
    new ImageResponse(
        <IconArt
            size={size.width}
            rounded={false}
        />,
        {
            ...size
        }
    )

export default AppleIcon
