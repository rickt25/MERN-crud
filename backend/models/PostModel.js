import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;
const Post = db.define('posts', {
  title:{
    type: DataTypes.STRING
  },
  content:{
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
})

export default Post;