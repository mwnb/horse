import { GLOBAL_EXCEPTION } from '../common/horseDefault.ts'

export class GlobalSet {
    static preRequest: RequestInteceptorCallback |undefined
    static aftResponse: ResponseInteceptorCallback |undefined
    static globalException: GE
    static beforeMiddleWare: Array<MiddleWare> = []
    static afterMiddleWare: Array<MiddleWare> = []

    static defaultGlobalException(e: unknown, ctx: Deno.RequestEvent) {
        const { message, stack, name } = e as Error
        ctx.respondWith(new Response(`${GLOBAL_EXCEPTION}<br>ExceptionName: ${name}<br>Message: ${message}<br>stack: ${stack}`, {
            headers: {
                'Content-Type': 'text/html'
            }
        }))
    }

    static setGlobalPreRequest(_preRequest: RequestInteceptorCallback) {
        this.preRequest = _preRequest
    }

    static setGlobalAftResponse(_aftResponse: RequestInteceptorCallback) {
        this.aftResponse = _aftResponse
    }
    
    static setGlobalException(_globalException: GE) {
        this.globalException = _globalException
    }

    static setBeforeMiddleWare(mw: MiddleWare) {
        this.beforeMiddleWare.push(mw)
    }

    static setAfterMiddleWare(mw: MiddleWare) {
        this.afterMiddleWare.push(mw)
    }
    
}