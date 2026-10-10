import {
    Blend,
    Copyright,
    ExternalLink,
    File,
    FileText,
    Grid3X3,
    House,
    Images,
    LayoutList,
    Layers,
    ListVideo,
    Menu,
    SlidersHorizontal,
    Text
} from 'lucide-react'

/**
 * Document & Object icons
 */
export const FrontPageIcon = House

export const PageIcon = File

export const PostIcon = FileText

export const PlaylistIcon = ListVideo

export const WorkIcon = Layers

export const MenuIcon = Menu

export const SettingsIcon = SlidersHorizontal

export const BodyIcon = Text

export const CollectionGridIcon = Grid3X3

export const GradientIcon = Blend

export const DetailsIcon = LayoutList

export const ImagesIcon = Images

export const ExternalLinkIcon = ExternalLink

export const CopyrightIcon = Copyright

/**
 * Social Link icons
 */
export const X = ({ className }: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}>
        <path d='M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' />
    </svg>
)

export const Instagram = ({ className }: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}>
        <rect
            width='20'
            height='20'
            x='2'
            y='2'
            rx='5'
            ry='5'
        />
        <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
        <line
            x1='17.5'
            x2='17.51'
            y1='6.5'
            y2='6.5'
        />
    </svg>
)

export const GitHub = ({ className }: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}>
        <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
        <path d='M9 18c-4.51 2-5-2-7-2' />
    </svg>
)

export const Reddit = ({ className }: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}>
        <path d='M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z' />
    </svg>
)

export const Threads = ({ className }: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}>
        <path d='M13.14,12.3c-.23,0-.47,0-.71.02-1.76.1-2.86.91-2.79,2.05.06,1.2,1.39,1.76,2.67,1.69,1.17-.06,2.7-.52,2.96-3.56-.7-.15-1.41-.22-2.12-.21ZM12.18,23.5h0c-3.43-.02-6.07-1.15-7.84-3.36-1.58-1.97-2.39-4.7-2.42-8.13v-.02c.03-3.43.84-6.16,2.42-8.13C6.1,1.65,8.74.52,12.17.5h.01c2.63.02,4.83.69,6.54,2.01,1.61,1.24,2.74,3,3.36,5.24l-1.95.55c-1.06-3.8-3.74-5.73-7.96-5.76-2.79.02-4.9.9-6.27,2.6-1.28,1.6-1.94,3.91-1.97,6.87.03,2.96.69,5.27,1.97,6.87,1.37,1.71,3.48,2.59,6.27,2.6,2.51-.02,4.18-.6,5.56-1.96,1.58-1.55,1.55-3.44,1.04-4.6-.3-.68-.84-1.25-1.57-1.68-.18,1.3-.6,2.34-1.23,3.14-.85,1.06-2.05,1.63-3.57,1.72-1.15.06-2.26-.21-3.12-.77-1.02-.66-1.61-1.67-1.68-2.84-.06-1.14.39-2.19,1.27-2.95.84-.73,2.03-1.16,3.43-1.24.97-.06,1.94-.01,2.89.14-.12-.71-.36-1.28-.72-1.68-.49-.56-1.25-.85-2.26-.85h-.03c-.81,0-1.91.22-2.61,1.26l-1.68-1.13c.94-1.39,2.46-2.16,4.29-2.16h.04c3.06.02,4.88,1.89,5.07,5.16.1.04.21.09.31.14,1.43.67,2.47,1.69,3.02,2.94.76,1.74.83,4.59-1.48,6.86-1.77,1.73-3.92,2.52-6.97,2.54h0Z' />
    </svg>
)

export const Youtube = ({ className }: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}>
        <path d='M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17' />
        <path d='m10 15 5-3-5-3z' />
    </svg>
)

export const Linkedin = ({ className }: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}>
        <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
        <rect
            width='4'
            height='12'
            x='2'
            y='9'
        />
        <circle
            cx='4'
            cy='4'
            r='2'
        />
    </svg>
)

export const Facebook = ({ className }: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}>
        <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
    </svg>
)

export const AppleMusic = ({ className }: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}>
        <path d='M9 18V5l12-2v13' />
        <circle
            cx='6'
            cy='18'
            r='3'
        />
        <circle
            cx='18'
            cy='16'
            r='3'
        />
    </svg>
)

export const XboxIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={className}>
        <path d='M10.85,23.47c-1.82-.19-3.57-.81-5.11-1.81-1.29-.84-1.58-1.19-1.58-1.88,0-1.39,1.53-3.82,4.14-6.59,1.48-1.57,3.55-3.42,3.77-3.37.43.1,3.91,3.49,5.21,5.08,2.06,2.52,3,4.59,2.52,5.51-.37.7-2.63,2.07-4.3,2.59-1.51.45-3.09.61-4.66.47h0ZM2.41,18.34c-1.09-1.68-1.73-3.61-1.88-5.61-.08-.94-.02-1.89.2-2.81.38-2.12,1.35-4.09,2.8-5.68.58-.6.63-.62,1.33-.38.85.29,1.77.92,3.18,2.2l.83.75-.45.55c-2.09,2.57-4.3,6.22-5.14,8.47-.45,1.23-.64,2.46-.44,2.97.13.35.01.22-.43-.46h0ZM21.25,18.62c.07-.82-.05-1.65-.34-2.43-.68-2.08-2.96-5.94-5.05-8.57l-.66-.83.71-.65c.7-.67,1.46-1.27,2.27-1.8.51-.33,1.08-.55,1.67-.65.21,0,.94.76,1.53,1.59.94,1.34,1.6,2.86,1.93,4.46.22,1.44.24,2.9.04,4.33-.19.94-.48,1.85-.86,2.72-.34.7-.73,1.38-1.18,2.02-.1.12-.12.05-.06-.21h0ZM11.04,3.31c-1.04-.52-2.14-.91-3.27-1.16-.36-.05-.73-.07-1.09-.06-.68.03-.65,0,.44-.51.85-.41,1.75-.71,2.68-.89,1.47-.24,2.98-.24,4.45,0,1.22.25,2.39.69,3.48,1.29l.24.15-.55-.03c-1.1-.06-2.7.39-4.43,1.23-.33.17-.66.32-1,.45-.03,0-.46-.21-.94-.46h0Z' />
    </svg>
)
