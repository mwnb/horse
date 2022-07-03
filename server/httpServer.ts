import { NOT_FOUND, NOT_FOUND_OPTIONS } from '../common/responseBasec.ts'
import {
    GET, POST, PUT, DELETE
} from '../common/requestMethods.ts'
import {
    GlobalSet
} from './globalSet.ts'


export class HttpBasicServer implements HttpServer {  
    
    static router = ''

    constructor(
        public ctx: Deno.RequestEvent,
        public requestData: RequestData
    ){
        this.mountMethods()
    }

    async mountMethods() {
        const { request } = this.ctx
        const {
            method
        } = request
        try {
            const next = await this.preRequest()
            if (next) {
                if (method === GET) {
                    await this.get()
                } else if (method === POST) {
                    await this.post()
                } else if (method === PUT) {
                    await this.put()
                } else if (method === DELETE) {
                    await this.delete()
                }
                if (this.aftRequest) {
                    await this.aftRequest()
                }
            }

            // global aftRequest
            if (GlobalSet.aftRequest) {
                GlobalSet.aftRequest(this.ctx)
            }
        } catch (e: unknown) {
            if (GlobalSet.globalException) {
                GlobalSet.globalException(e, this.ctx)
            } else {
                GlobalSet.defaultGlobalException(e, this.ctx)
            }
        }
        
    }
    async get() {
        await this.ctx.respondWith(new Response(NOT_FOUND, NOT_FOUND_OPTIONS))
    }
    async post() {
        await this.ctx.respondWith(new Response(NOT_FOUND, NOT_FOUND_OPTIONS))
    }
    async delete() {
        await this.ctx.respondWith(new Response(NOT_FOUND, NOT_FOUND_OPTIONS))
    }
    async put() {
        await this.ctx.respondWith(new Response(NOT_FOUND, NOT_FOUND_OPTIONS))
    }
    async preRequest() {
        return await Promise.resolve(true);
    }
    async aftRequest() {
        return await Promise.resolve(true);
    }

}