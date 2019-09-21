import { ServerSettings, ServerLoader, GlobalAcceptMimesMiddleware } from "@tsed/common"
import * as bodyParser from 'body-parser'
import * as methodOverride from 'method-override';
import * as Path from 'path';
import * as config from '../config/config.json'

@ServerSettings({
    rootDir: Path.resolve(__dirname, ".."),
    port: config.server.port,
    mount: {
        "/api": "${rootDir}/controllers/**/*.ts" // support ts with ts-node then fallback to js
      },
})

export default class RouterServer extends ServerLoader {
    public $beforeRoutesInit() : void | Promise<any> {
        this
            .use(GlobalAcceptMimesMiddleware)
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
    }
}