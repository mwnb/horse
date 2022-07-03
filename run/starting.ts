import { serverMap } from '../server/mount.ts'
import { NOT_FOUND, NOT_FOUND_OPTIONS } from '../common/responseBasec.ts'
import { GlobalSet } from '../server/globalSet.ts'
import { parseRequestData } from '../util/parseRequestData/index.ts'

export async function start(
    ctx: Deno.RequestEvent
) {
    const { 
        url
    } = ctx.request
    const {
        pathname
    } = new URL(url)

    // beforeMiddle
    for await (const bool of GlobalSet.beforeMiddleWare.map(fn => fn(ctx))) {
        if (!bool) {
            return
        }
    }

    const Server = serverMap.get(pathname) as new (request: Deno.RequestEvent, requestData: RequestData) => HttpServer
    if (Server) {
        // pre request
        if (GlobalSet.preRequest) {
            await GlobalSet.preRequest(ctx)
        }

        new Server(ctx, await parseRequestData(ctx)) // about service
    } else {
        // afterMiddleWare
        for await (const bool of GlobalSet.afterMiddleWare.map(fn => fn(ctx))) {
            if (!bool) {
                return
            }
        }
        ctx.respondWith(
            new Response(NOT_FOUND, NOT_FOUND_OPTIONS)
        )
    }
    


}