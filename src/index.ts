import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import mongoDbCustom from "./config/db/index.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(express.text())

// template engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log('__filename', __filename);
// connect to db
mongoDbCustom.connect()

app.set("views", path.join(__dirname, '/resources/views'));

routes(app)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // Log lỗi
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        errorCode: 1
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});