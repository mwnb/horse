import {
    APPPLICATION_JSON
} from '../../common/contentType.ts'

export async function parseRequestData(ctx: Deno.RequestEvent) {
    const bodyData = await parseBodyData(ctx)
    return {
        get: parseGetData(ctx),
        post: bodyData,
        put: bodyData,
        delete: bodyData,
    }
}


function parseGetData(ctx: Deno.RequestEvent) {
    let params: KVO = {}
    const {
        url,
        headers
    } = ctx.request
    const urlO = new URL(url)
    const contentType = headers.get('Content-Type')
    if (contentType === APPPLICATION_JSON) {
        try {
            params = JSON.parse(urlO.search.slice(1)) as KVO
        } catch {
            // pass
        }
    } else {
        urlO.searchParams.forEach((v, k) => {
            params[k] = v
        })
    }
    return params
}

async function parseBodyData(ctx: Deno.RequestEvent) {
    console.log('????')
    let params: KVO = {}
    const {
        headers
    } = ctx.request
    const contentType = headers.get('Content-Type')
    if (contentType === APPPLICATION_JSON) {
        try {
            const json = await ctx.request.json()
            params = json
        } catch {
            // pass
        }
    } else {
        const searchParamsO = new URLSearchParams(await ctx.request.text())
        searchParamsO.forEach((v, k) => {
            params[k] = v
        })
    }
    return params
}