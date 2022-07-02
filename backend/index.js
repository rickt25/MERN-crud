import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Posts from "./models/PostModel.js";
dotenv.config();
const app = express();

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(express.json());
app.use(router);

app.listen(5001, ()=> console.log('Server running at port 5001'));