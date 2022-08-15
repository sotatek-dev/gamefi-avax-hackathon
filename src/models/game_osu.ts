import { DataType } from "sequelize-typescript";
const db = require('../db');

const Game_osu = db.define('game_osu', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    player: {
        type: DataType.TEXT,
    },
    amount: {
        type: DataType.FLOAT,
    },
}, {
    timestamps: false
})

module.exports = Game_osu