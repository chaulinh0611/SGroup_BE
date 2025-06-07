import express from 'express';
import path, { dirname, join } from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

import router from './routes/app.route.js';
import { errorHandler } from './middleware/error.middleware.js';
import templateEngineConfig from './config/jwt.config.js';
import { connectDB } from './config/db.config.js';
import mongoose from 'mongoose';
import Poll from './models/poll.model.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;


app.use(express.json());
app.use('/public', express.static(join(__dirname, 'public')));


app.use('/', router);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  },
});

const upload = multer({ storage });


app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  if (!req.file) {
    const error = new Error('Please upload a file');
    error.statusCode = 400;
    return next(error);
  }
  res.json({
    success: true,
    message: 'File uploaded successfully',
    data: req.file,
  });
});


app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    const error = new Error('Please choose files');
    error.statusCode = 400;
    return next(error);
  }
  res.json({
    success: true,
    message: 'Files uploaded successfully',
    data: req.files,
  });
});


app.use(errorHandler);

const runApp = async () => {
  try {
    await connectDB();
    console.log('connected DB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
};

await runApp();
