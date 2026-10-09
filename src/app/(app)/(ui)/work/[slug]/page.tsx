/**
 * SlinkyPixels : /work/[slug]/ - Page
 */
import Composer from '@/components/composer'
import { ExternalLinkIcon, FrontPageIcon } from '@/components/icons'
import Link from '@/components/link'
import { Typography, typographyVariants } from '@/components/typography'
import { prettifyUrl } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { sanityFetch } from '@/sanity/lib/live'
import { WORK_PATHS_QUERY, WORK_QUERY } from '@/sanity/lib/queries'
import { Badge } from '@ui/badge'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@ui/breadcrumb'
import { Separator } from '@ui/separator'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => {
    const { data: works } = await sanityFetch({
        query: WORK_PATHS_QUERY,
        perspective: 'published',
        stega: false
    })

    return works.map((work) => ({
        slug: work?.slug?.current
    }))
}

export const generateMetadata = async ({
    params
}: PageProps<'/work/[slug]'>) => {
    const { data: work } = await sanityFetch({
        query: WORK_QUERY,
        params: await params,
        stega: false
    })

    /**
     * If page is not found, return 404
     */
    if (!work) notFound()

    return {
        title: `${work.title} : Work`
    }
}

const Work = async ({ params }: PageProps<'/work/[slug]'>) => {
    const { data: work } = await sanityFetch({
        query: WORK_QUERY,
        params: await params
    })

    /**
     * Bail if no work found
     */
    if (!work) notFound()

    return (
        <>
            <div className='container mx-auto flex flex-col items-start gap-2 py-16 md:pt-20 lg:max-w-[980px]'>
                <div className='flex w-full flex-col items-center gap-6 md:flex-row md:justify-between'>
                    <div className='flex flex-col items-center gap-4 md:items-start'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        render={
                                            <Link
                                                href='/'
                                                title='Go to Frontpage'
                                                aria-label='Go to Frontpage'
                                            />
                                        }>
                                        <FrontPageIcon className='size-3 text-muted-foreground hover:text-foreground' />
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        render={
                                            <Link
                                                href='/work/'
                                                title='View all Work'
                                            />
                                        }
                                        className={cn(
                                            typographyVariants({
                                                muted: true,
                                                variant: 'small'
                                            })
                                        )}>
                                        Work
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {work.title}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Typography
                            variant='h1'
                            className='text-center md:text-start'>
                            {work.title}
                        </Typography>
                        <Typography
                            variant='p'
                            as='span'
                            className='text-center text-balance md:text-start'
                            muted>
                            {work.subtitle}
                        </Typography>

                        {work.url && (
                            <div className='flex items-center gap-1 text-center md:text-start'>
                                <Link
                                    href={work.url}
                                    title={`Visit ${work.title}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={cn([
                                        'text-transparent',
                                        'bg-linear-125',
                                        'from-primary',
                                        'via-secondary',
                                        'to-tertiary',
                                        'bg-clip-text',
                                        'transition',
                                        'duration-200',
                                        'hover:text-transparent',
                                        'hover:from-primary-foreground',
                                        'hover:via-secondary-foreground',
                                        'hover:to-tertiary-foreground',
                                        'dark:hover:text-transparent',
                                        'dark:hover:from-primary-foreground',
                                        'dark:hover:via-secondary-foreground',
                                        'dark:hover:to-tertiary-foreground'
                                    ])}>
                                    {prettifyUrl(work.url)}
                                </Link>
                                <ExternalLinkIcon className='size-4 text-muted-foreground' />
                            </div>
                        )}
                        {work.uses && (
                            <div className='flex flex-wrap justify-center gap-2 pt-2 md:max-w-md md:justify-start'>
                                {work.uses.map((use) => (
                                    <Badge
                                        key={use}
                                        variant='outline'
                                        className='text-muted-foreground'>
                                        {use}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <Separator className='mt-6 md:mt-12' />
            </div>
            <Composer
                content={work.content}
                documentId={work._id}
                documentType={work._type}
            />
        </>
    )
}

export default Work
