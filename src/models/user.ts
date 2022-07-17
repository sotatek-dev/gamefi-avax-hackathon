import { DataType } from "sequelize-typescript";
const db = require('../db');

const User = db.define('user', {
    address: {
        type: DataType.TEXT,
        primaryKey: true,
        autoIncrement: false
    },
    balance: {
        type: DataType.FLOAT,
    }
}, {
    timestamps: false
})

module.exports = User