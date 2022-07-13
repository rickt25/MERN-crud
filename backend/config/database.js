import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, user, password, {
  host: host,
  dialect: "mysql"
});

export default sequelize;

