import {
    HttpBasicServer,
} from '../server/httpServer.ts'
import {
    mount,
    setPrefix
} from '../server/mount.ts'
import {
    run
} from '../run/run.ts'
import {
    GlobalSet
} from '../server/globalSet.ts'


export default class Horse {    
    static HttpServer: HttpServer
    static HttpHandleFunc: HttpHandleFunc

    static mount = mount
    static setPrefix = setPrefix
    static HttpBasicServer = HttpBasicServer
    static run = run
    static globalSet = GlobalSet
}