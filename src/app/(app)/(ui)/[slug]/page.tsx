/**
 * SlinkyPixels : /[slug]/ - Page
 */
import Composer from '@/components/composer'
import { FrontPageIcon } from '@/components/icons'
import Image from '@/components/image'
import Link from '@/components/link'
import { Typography } from '@/components/typography'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_PATHS_QUERY, PAGE_QUERY } from '@/sanity/lib/queries'
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
    const { data: pagePaths } = await sanityFetch({
        query: PAGE_PATHS_QUERY,
        perspective: 'published',
        stega: false
    })

    return pagePaths.map((page) => ({
        slug: page?.slug?.current
    }))
}

export const generateMetadata = async ({
    params
}: {
    params: Promise<{ slug: string }>
}) => {
    const { data: page } = await sanityFetch({
        query: PAGE_QUERY,
        params: await params
    })

    /**
     * If page is not found, return 404
     */
    if (!page) notFound()

    return {
        title: page.title
    }
}

const Page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
    const { data: page } = await sanityFetch({
        query: PAGE_QUERY,
        params: await params
    })

    /**
     * Bail if no page found
     */
    if (!page) notFound()

    return (
        <>
            <div className='container mx-auto flex flex-col items-start gap-2 py-16 md:py-20 lg:max-w-[980px]'>
                <div className='flex w-full flex-col items-center gap-6 md:flex-row-reverse md:justify-between'>
                    {page.image && (
                        <Image
                            image={page.image}
                            alt={page.title}
                            priority
                            width={200}
                            height={200}
                            className='aspect-square rounded-full object-cover'
                        />
                    )}
                    <div className='flex flex-col items-center gap-4 md:items-start'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href='/'
                                            title='Go to Frontpage'
                                            aria-label='Go to Frontpage'>
                                            <FrontPageIcon className='size-3 text-muted-foreground hover:text-foreground' />
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {page.title}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <Typography
                            variant='h1'
                            className='text-center md:text-start'>
                            {page.title}
                        </Typography>
                        <Typography
                            variant='p'
                            as='span'
                            className='text-center text-balance md:text-start'
                            muted>
                            {page.subtitle}
                        </Typography>
                    </div>
                </div>
                <Separator className='mt-6 md:mt-12' />
            </div>
            <Composer
                content={page.content}
                documentId={page._id}
                documentType={page._type}
            />
        </>
    )
}

export default Page
