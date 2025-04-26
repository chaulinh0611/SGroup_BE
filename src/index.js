import express from "express"
import path from 'path';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import router from "./routes/app.route.js"
import errorHandler from "./middleware/errorHandle.middleware.js"
import templateEngineConfig from "./config/templateEngine.config.js"
import {connectDB} from './config/db.config.js'
import hashProvide  from "./providers/hash.provide.js";
const startApp = () =>{
    const app = express()
    const port = 3000

    app.use(express.json())
    app.use("/abc",express.static(path.join(__dirname, 'public')));
    app.use("/", router)
    templateEngineConfig(app)
    app.use(errorHandler)


    app.listen(port, () => {
        console.log(`Example app listening on port `);
    })
}
const run = async() => {
    const hashed = await hashProvide.generateHash('123456');
    console.log(hashed);
  };
  await run();

const runApp = async () => {
    try{
        await connectDB();
        console.log('connect');
        startApp()
    }catch(err){
        console.log(err);
        process.exit(1)
    }
};

await runApp();