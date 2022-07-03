/**
 * mount class to router
*/
import { HttpBasicServer } from './httpServer.ts'


import classNametoResourcePath from '../util/classNametoResourcePath.ts'

// deno-lint-ignore no-inferrable-types
let prefix: string = ''

export function setPrefix(_prefix: string) {
    prefix = _prefix
}

// deno-lint-ignore ban-types
export const serverMap = new Map<string, Function>()

export function mount(
    // deno-lint-ignore ban-types
    Server: Function
) {
    // deno-lint-ignore no-explicit-any
    const { router } = (Server as any)
    if (router && router.trim()) {
        const routerName = router.trim().startsWith('/') ? router.trim() : `/${router.trim()}`
        serverMap.set(`${prefix}${routerName}`, Server) 
    } else {
        const routerName = classNametoResourcePath(Server.name)
        serverMap.set(`${prefix}/${routerName}`, Server) 
    }
}