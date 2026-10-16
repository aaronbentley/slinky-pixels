/**
 * SlinkyPixels : Content : Get In Touch
 * The Get In Touch row as a content block, e.g. at the end of About
 */
import GetInTouchRow from '@/components/get-in-touch'

const GetInTouch = ({
    id,
    order,
    title,
    text
}: {
    id: string
    order: number
    title?: string | null
    text?: string | null
}) => (
    <div
        id={id}
        data-order={order}
        className='mx-auto w-full max-w-7xl px-8'>
        <GetInTouchRow
            title={title}
            text={text}
            className='border-t border-t-foreground'
        />
    </div>
)

export default GetInTouch
