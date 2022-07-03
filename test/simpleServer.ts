import Horse from '../main/index.ts'
import { globalPreRequest, globalAftRequest } from './inteceptor.ts'

class Env extends Horse.HttpBasicServer{

    static router = '/envAbout'

    async preRequest() {
        console.log('preRequest!')
        return await Promise.resolve(true)
    }

    async aftRequest() {
        console.log('afterRequest!', 'do something...')
        return await Promise.resolve(true)
    }

    async get() {
        console.log('env get!')
        throw Error('sb')
        await this.ctx.respondWith(
            new Response(this.getEvn())
        )
    }

    async post() {
        console.log('?', this.requestData)
        
        await this.ctx.respondWith(
            new Response("env post")
        )
    }

    getEvn() {
        return JSON.stringify(Deno.env.toObject(), null, 2)
    }
}

Horse.setPrefix("/api/v3")
Horse.globalSet.setGlobalPreRequest(globalPreRequest)
Horse.globalSet.setGlobalPreRequest(globalAftRequest)
Horse.globalSet.setGlobalException((e: unknown, ctx: Deno.RequestEvent) => {
    ctx.respondWith(
        new Response(JSON.stringify({
            exception: true,
            info: (e as Error).stack
        }))
    )
})
Horse.globalSet.setBeforeMiddleWare(async (ctx: Deno.RequestEvent) => {
    console.log('ctx.request.url', ctx.request.url)
    return true;
})
Horse.mount(Env)
Horse.run({
    port: 8080
})