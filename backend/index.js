import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(express.json());

app.use(router);

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
  await Users.sync();
  await Posts.sync();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(5001, () => {
  console.log('Server running at port 5001')
});