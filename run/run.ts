import { RunOptions } from '../type.d.ts'
import { start } from './starting.ts'

//other
import { printServerMap } from '../util/printRouter/index.ts'

const {
    serveHttp,
    listen,
    listenTls,
} = Deno;



async function init(listen: Deno.Listener | Deno.TlsListener) {
    for await (const conn of listen) {
        for await (const ctx of serveHttp(conn)) {
            await start(ctx)
        }
    }
}

export async function run(options: RunOptions) {
    // other 
    printServerMap()


    if (options.https) {
        await init(listenTls(options))
    } else {
        await init(listen(options))
    }
}