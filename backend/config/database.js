import { Sequelize } from "sequelize";

const sequelize = new Sequelize('belajarlogin', 'root', 'password', {
  host: "127.0.0.1",
  dialect: "mysql"
});

export default sequelize;

