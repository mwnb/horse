declare interface RunOptions extends Deno.ListenOptions, Deno.ListenTlsOptions {
    https?: boolean
}
declare type HttpHandleFunc = (serve: Deno.RequestEvent) => void

declare interface HttpServer {   
    ctx: Deno.RequestEvent 
    get?: HttpHandleFunc
    post?: HttpHandleFunc
    delete?: HttpHandleFunc
    put?: HttpHandleFunc
}

declare type RequestInteceptorCallback = (ctx: Deno.RequestEvent) => boolean | Promise<boolean>
declare type ResponseInteceptorCallback = RequestInteceptorCallback
declare type MiddleWare = RequestInteceptorCallback

declare interface ParamsData {
    get?: KVO
}

declare type KVO = {[k: string]: unknown}

declare type GE = (e: unknown, ctx: Deno.RequestEvent) => void

declare interface RequestData {
    get: KVO | Promise<KVO>
    post: KVO | Promise<KVO>
    put: KVO | Promise<KVO>
    delete: KVO | Promise<KVO>
}