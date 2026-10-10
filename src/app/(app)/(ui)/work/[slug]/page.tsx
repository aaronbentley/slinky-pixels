/**
 * SlinkyPixels : /work/[slug]/ - Page
 */
import Composer from '@/components/composer'
import DetailsList from '@/components/details-list'
import Link from '@/components/link'
import PageCover from '@/components/page-cover'
import PageHero from '@/components/page-hero'
import RowLink from '@/components/row-link'
import { gradientLinkClasses, Typography } from '@/components/typography'
import {
    getMenuPosition,
    prettifyUrl,
    resolveDocumentReferenceURL,
    resolveMenuLinks
} from '@/lib/helpers'
import { buildMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'
import { sanityFetch } from '@/sanity/lib/live'
import { MENU_QUERY, WORK_PATHS_QUERY, WORK_QUERY } from '@/sanity/lib/queries'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@ui/breadcrumb'
import { buttonVariants } from '@ui/button'
import { ArrowUpRight } from 'lucide-react'
import { Metadata } from 'next'
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
}: PageProps<'/work/[slug]'>): Promise<Metadata> => {
    const { slug } = await params
    const { data: work } = await sanityFetch({
        query: WORK_QUERY,
        params: { slug },
        stega: false
    })

    /**
     * If page is not found, return 404
     */
    if (!work) notFound()

    return buildMetadata({
        title: `${work.seo?.seoTitle ?? work.title} : Work`,
        description: work.seo?.seoDescription ?? work.subtitle,
        path: `/work/${slug}/`,
        type: 'article'
    })
}

const Work = async ({ params }: PageProps<'/work/[slug]'>) => {
    const [{ data: work }, { data: menu }] = await Promise.all([
        sanityFetch({
            query: WORK_QUERY,
            params: await params
        }),
        sanityFetch({
            query: MENU_QUERY,
            params: { title: 'Nav Menu' }
        })
    ])

    /**
     * Bail if no work found
     */
    if (!work) notFound()

    /**
     * The Work page's position in the menu for the breadcrumb, e.g. "02 — Work"
     */
    const workHref = '/work/'
    const position = getMenuPosition(resolveMenuLinks(menu?.links), workHref)

    /**
     * Next project, in the Work page's collection order, wrapping to the first
     */
    const collection = (work.collection ?? []).flatMap((item) =>
        item.slug ? [{ ...item, slug: item.slug }] : []
    )
    const currentIndex = collection.findIndex((item) => item._id === work._id)
    const next =
        currentIndex !== -1 && collection.length > 1
            ? collection[(currentIndex + 1) % collection.length]
            : null

    /**
     * Project details shown alongside the first body block
     */
    const descriptionKey = work.content?.find(
        (block) => block._type === 'body'
    )?._key

    const details = (
        <DetailsList
            title='Project'
            items={[
                ...(work.url
                    ? [
                          {
                              _key: 'url',
                              label: 'Live site',
                              text: (
                                  <Link
                                      href={work.url}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                      className={cn(gradientLinkClasses)}>
                                      {prettifyUrl(work.url)}
                                  </Link>
                              )
                          }
                      ]
                    : []),
                ...(work.uses && work.uses.length > 0
                    ? [{ _key: 'uses', label: 'Built with', tags: work.uses }]
                    : [])
            ]}
        />
    )

    return (
        <>
            <PageHero
                eyebrow={
                    <Breadcrumb aria-label='Breadcrumb'>
                        <BreadcrumbList className='gap-2 text-[13px]'>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    render={<Link href={workHref} />}
                                    className='text-muted-foreground hover:text-foreground'>
                                    {position
                                        ? `${position.n} — ${position.label}`
                                        : 'Work'}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{work.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                }
                title={work.title}
                subtitle={work.subtitle}
                actions={
                    work.url && (
                        <Link
                            href={work.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={cn(
                                buttonVariants({ variant: 'outline' }),
                                'h-11 gap-2 px-4.5 text-[15px] text-foreground hover:text-foreground'
                            )}>
                            Visit {prettifyUrl(work.url)}
                            <ArrowUpRight
                                aria-hidden='true'
                                className='size-4'
                            />
                        </Link>
                    )
                }
                bordered={!work.image?.asset}
            />
            <PageCover
                image={work.image}
                alt={work.title}
                aspect='video'
            />
            <Composer
                content={work.content}
                documentId={work._id}
                documentType={work._type}
                blockProps={
                    descriptionKey
                        ? { [descriptionKey]: { aside: details } }
                        : undefined
                }
                className='w-full gap-y-24 pt-18'
            />
            {next && (
                <nav
                    aria-label='More work'
                    className='mx-auto w-full max-w-7xl px-8 pt-24 pb-8'>
                    <RowLink
                        href={resolveDocumentReferenceURL(
                            next._type,
                            next.slug
                        )}
                        arrow='right'
                        arrowClassName='size-7 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5'
                        className='flex-wrap justify-between gap-x-6 gap-y-3 border-t border-b border-t-foreground py-7 hover:px-4 focus-visible:px-4'>
                        <span className='flex flex-col gap-2'>
                            <Typography variant='label'>
                                Next project
                            </Typography>
                            <span className='text-[2.5rem]/[1.05] font-semibold tracking-tighter'>
                                {next.title}
                            </span>
                        </span>
                    </RowLink>
                </nav>
            )}
        </>
    )
}

export default Work
