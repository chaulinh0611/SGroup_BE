import express from "express"
import path from 'path';
import multer from 'multer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import router from "./routes/app.route.js"
import errorHandler from "./middleware/errorHandle.middleware.js"
import templateEngineConfig from "./config/templateEngine.config.js"
import {connectDB} from './config/db.config.js'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Thư mục lưu trữ file
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Lấy phần mở rộng của file
        cb(null, file.fieldname + '-' + Date.now() + ext); // Tạo tên file mới
    }
});
   
  var upload = multer({ storage: storage })
const startApp = () =>{
    const app = express()
    const port = 3000

    app.use(express.json())
    app.use("/abc",express.static(path.join(__dirname, 'public')));
    app.use("/", router)
    templateEngineConfig(app)
    app.use(errorHandler)

    app.post("/uploadfile", upload.single('myFile'), (req, res, next) => {
        const file = req.file;
        if (!file) {
            const error = new Error('Please upload a file');
            error.httpStatusCode = 400;
            return next(error);
        }
        res.send(file);
    });
    app.post("/uploadmultiple", upload.array('myFiles', 12), (req, res, next) => {
        const files = req.files;
        if (!files) {
            const error = new Error('Please choose files');
            error.httpStatusCode = 400;
            return next(error);
        }
        res.send(files);
    });
    app.listen(port, () => {
        console.log(`✅ Example app listening on port ${port}`);
    })
}


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