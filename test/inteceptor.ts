import { parseRequestData } from '../util/parseRequestData/index.ts'

export function globalPreRequest(ctx: Deno.RequestEvent) {
    // console.log('我是全局的哟! globalPreRequest')
    // console.log('get 参数', parseRequestData(ctx))
    return true
}

export function globalAftRequest(ctx: Deno.RequestEvent) {
    // console.log('我是全局的哟! globalAftRequest')
    // console.log('get 参数', parseRequestData(ctx))
    return true
}