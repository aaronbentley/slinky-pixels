/**
 * SlinkyPixels : Typography component
 * @description Compliments ShadCN UI by providing a set of composable typography components
 */
import { cn } from '@/lib/utils'
import { useRender } from '@base-ui/react/use-render'
import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

/**
 * Line heights are set with the `text-{size}/{leading}` shorthand so they travel
 * with the font size and can't be dropped by tailwind-merge (a standalone
 * `leading-*` is removed whenever a later `text-{size}` class is merged in).
 * Convention: sizes up to `xl` use Tailwind's default ratios, `2xl`–`4xl` use
 * `/tight` and `5xl` and above use `/none`.
 */
export const headingBaseClasses = [
    'text-pretty',
    'font-bold',
    'tracking-tighter'
]
export const proseBaseClasses = ['text-lg', 'tracking-tight']

const typographyVariants = cva([], {
    variants: {
        variant: {
            h1: [
                ...headingBaseClasses,
                'text-4xl/tight',
                'md:text-5xl/none',
                'lg:text-6xl/none',
                'xl:text-7xl/none'
            ],
            h2: [
                ...headingBaseClasses,
                'font-semibold',
                'text-2xl/tight',
                'md:text-3xl/tight',
                'lg:text-4xl/tight',
                'xl:text-5xl/none'
            ],
            h3: [
                ...headingBaseClasses,
                'font-semibold',
                'text-xl',
                'md:text-2xl/tight',
                'lg:text-3xl/tight',
                'xl:text-4xl/tight'
            ],
            h4: [
                ...headingBaseClasses,
                'font-semibold',
                'text-lg',
                'md:text-xl',
                'lg:text-2xl/tight',
                'xl:text-3xl/tight'
            ],
            h5: [
                ...headingBaseClasses,
                'font-semibold',
                'text-base',
                'md:text-lg',
                'lg:text-xl',
                'xl:text-2xl/tight'
            ],
            h6: [
                ...headingBaseClasses,
                'font-semibold',
                'text-sm',
                'md:text-base',
                'lg:text-lg',
                'xl:text-xl'
            ],
            link: [
                ...proseBaseClasses,
                'inline',
                'underline-offset-4',
                'hover:underline'
            ],
            p: [...proseBaseClasses],
            span: [...proseBaseClasses],
            lead: [
                ...proseBaseClasses,
                'sm:text-xl',
                'md:text-2xl/tight',
                'lg:text-3xl/tight'
            ],
            blockquote: [
                ...proseBaseClasses,
                'my-6',
                'border-l-2',
                'border-secondary',
                'bg-muted',
                'py-12',
                'px-8',
                'mx-auto',
                'text-xl',
                'italic',
                'max-w-prose'
            ],
            ul: ['list-disc', 'list-inside', 'ps-4', 'space-y-2', 'my-2'],
            ol: ['list-decimal', 'list-inside', 'ps-4', 'space-y-2', 'my-2'],
            li: [...proseBaseClasses],
            small: ['text-sm'],
            address: [...proseBaseClasses, 'not-italic!', 'max-w-xs'],
            /**
             * Inline marks - inherit size, font and colour from their parent
             * so they sit correctly inside headings, leads, etc.
             */
            em: ['italic'],
            strong: ['font-semibold'],
            del: ['line-through'],
            underline: ['underline', 'underline-offset-4']
        },
        muted: {
            true: ['text-muted-foreground']
        },
        size: {
            xs: ['text-xs'],
            sm: ['text-sm'],
            base: ['text-base'],
            lg: ['text-lg'],
            xl: ['text-xl'],
            '2xl': ['text-2xl/tight'],
            '3xl': ['text-3xl/tight'],
            '4xl': ['text-4xl/tight'],
            '5xl': ['text-5xl/none'],
            '6xl': ['text-6xl/none'],
            '7xl': ['text-7xl/none'],
            '8xl': ['text-8xl/none'],
            '9xl': ['text-9xl/none']
        },
        weight: {
            thin: ['font-thin'],
            extralight: ['font-extralight'],
            light: ['font-light'],
            normal: ['font-normal'],
            medium: ['font-medium'],
            semibold: ['font-semibold'],
            bold: ['font-bold'],
            extrabold: ['font-extrabold'],
            black: ['font-black']
        },
        display: { true: '' }
    },
    compoundVariants: [
        /**
         * Display [display] - Increase font size for larger text elements
         */
        {
            variant: 'h1',
            display: true,
            className: [
                'text-6xl/none',
                'md:text-7xl/none',
                'lg:text-8xl/none',
                'xl:text-9xl/none'
            ]
        },
        {
            variant: 'h2',
            display: true,
            className: [
                'text-5xl/none',
                'md:text-6xl/none',
                'lg:text-7xl/none',
                'xl:text-8xl/none'
            ]
        },
        {
            variant: 'h3',
            display: true,
            className: [
                'text-4xl/tight',
                'md:text-5xl/none',
                'lg:text-6xl/none',
                'xl:text-7xl/none'
            ]
        },
        {
            variant: 'h4',
            display: true,
            className: [
                'text-3xl/tight',
                'md:text-4xl/tight',
                'lg:text-5xl/none',
                'xl:text-6xl/none'
            ]
        },
        {
            variant: 'h5',
            display: true,
            className: [
                'text-2xl/tight',
                'md:text-3xl/tight',
                'lg:text-4xl/tight',
                'xl:text-5xl/none'
            ]
        },
        {
            variant: 'h6',
            display: true,
            className: [
                'text-xl',
                'md:text-2xl/tight',
                'lg:text-3xl/tight',
                'xl:text-4xl/tight'
            ]
        }
    ],
    defaultVariants: {
        variant: 'p'
    }
})

type VariantPropType = VariantProps<typeof typographyVariants>

const variantElementMap: Record<
    NonNullable<VariantPropType['variant']>,
    keyof React.JSX.IntrinsicElements
> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    link: 'a',
    p: 'p',
    span: 'span',
    lead: 'p',
    blockquote: 'blockquote',
    ul: 'ul',
    ol: 'ol',
    li: 'li',
    small: 'small',
    address: 'address',
    em: 'em',
    strong: 'strong',
    del: 'del',
    underline: 'span'
}

export interface TypographyProps
    extends
        Omit<
            React.AllHTMLAttributes<HTMLElement>,
            keyof VariantPropType | 'as'
        >,
        VariantPropType {
    ref?: React.Ref<HTMLElement>
    render?: useRender.RenderProp
    as?: keyof React.JSX.IntrinsicElements
}

const Typography = ({
    className,
    variant,
    as,
    render,
    ref,
    muted,
    size,
    weight,
    display,
    ...props
}: TypographyProps) =>
    useRender({
        // Fall back to the same 'p' default as `defaultVariants` so the element matches the styles
        defaultTagName: as ?? variantElementMap[variant ?? 'p'],
        render,
        ref,
        props: {
            ...props,
            className: cn(
                typographyVariants({
                    variant,
                    muted,
                    size,
                    weight,
                    display,
                    className
                })
            )
        }
    })

export { Typography, typographyVariants }
