import { yellow, green } from 'https://deno.land/std/fmt/colors.ts'
import {
    serverMap
} from '../../server/mount.ts'
import {
    HttpServer
} from '../../server/httpServer.ts'

export function printServerMap() {
    serverMap.forEach((Server, resourcePath) => {
        const keys = Reflect.ownKeys((Server as new (request: Deno.RequestEvent) => HttpServer).prototype).map(
            k => k.toString().toUpperCase()
        )
        const methods: Array<string> = []
        if (keys.includes('GET')) {
            methods.push(yellow('GET'))
        }
        if (keys.includes('POST')) {
            methods.push(yellow('POST'))
        }
        if (keys.includes('PUT')) {
            methods.push(yellow('PUT'))
        }
        if (keys.includes('DELETE')) {
            methods.push(yellow('DELETE'))
        }
        console.log(`${green(resourcePath)}   methods: ${methods.join(', ')}`)
    })
}