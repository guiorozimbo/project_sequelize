const Sequelize=require("sequelize")
const config=require("../backend/config/database.js")
const data = new Sequelize(config)
module.exports=data