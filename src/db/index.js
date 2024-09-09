import "dotenv/config"
import { DataTypes, Sequelize } from "sequelize"
import defineUserModel from "../models/user.model.js"
import defineProductModel from "../models/product.model.js"

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    dialect : 'postgres'
})


const User = defineUserModel(sequelize, DataTypes)
const Product = defineProductModel(sequelize, DataTypes)


export {sequelize, User, Product}