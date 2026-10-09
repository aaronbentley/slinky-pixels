/**
 * SlinkyPixels : Route Handler : Revalidate
 * @description Called by a Sanity GROQ webhook when a document is published or deleted.
 * Every page shares the header/footer and can embed other documents (e.g. the work grid),
 * so the whole site is revalidated rather than individual paths or tags. This covers content
 * changes made while no visitor has <SanityLive /> open.
 */
import { parseBody } from 'next-sanity/webhook'
import { revalidatePath } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

type WebhookPayload = {
    _type: string
}

export const POST = async (request: NextRequest) => {
    try {
        if (!process.env.SANITY_REVALIDATE_SECRET) {
            return NextResponse.json(
                {
                    message:
                        'Missing environment variable: SANITY_REVALIDATE_SECRET'
                },
                { status: 500 }
            )
        }

        /**
         * Verify the webhook signature, waiting for the Content Lake to be
         * consistent so the revalidated pages fetch the new content
         */
        const { isValidSignature, body } = await parseBody<WebhookPayload>(
            request,
            process.env.SANITY_REVALIDATE_SECRET,
            true
        )

        if (!isValidSignature) {
            return NextResponse.json(
                { message: 'Invalid signature' },
                { status: 401 }
            )
        }

        if (!body?._type) {
            return NextResponse.json(
                { message: 'Bad Request', body },
                { status: 400 }
            )
        }

        revalidatePath('/', 'layout')

        return NextResponse.json({ revalidated: true, type: body._type })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: (error as Error).message },
            { status: 500 }
        )
    }
}
