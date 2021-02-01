import {Startup} from './src/index';
import configs from './src/config/index';

require("dotenv").config();

declare global {
    namespace NodeJS {
        interface Global {
            config: typeof configs;
        }
    }
}

new Startup();
