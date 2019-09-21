import { $log, ServerLoader } from "@tsed/common"
import RouterServer from "./routes/Server";
import * as config from "./config/config.json";

async function bootstrap() {
    try {
        $log.debug(`*** STARTING SERVER ON PORT ${config.server.port} ***`);
        const app = await ServerLoader.bootstrap(RouterServer);
        await app.listen();
        $log.debug("*** SERVER ONLINE ***");
    } catch (er) {
        $log.error(er);
    }
}

bootstrap();