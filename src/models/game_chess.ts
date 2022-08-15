import { DataType } from "sequelize-typescript";
const db = require('../db');

const Game_chess = db.define('game_chess', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    player_1: {
        type: DataType.TEXT,
    },
    player_2: {
        type: DataType.TEXT,
    }, 
    amount: {
        type: DataType.FLOAT,
    },
    message_player_1: {
        type: DataType.TEXT,
    },
    signature_player_1: {
        type: DataType.TEXT,
    }, 
    message_player_2: {
        type: DataType.TEXT,
    }, 
    signature_player_2: {
        type: DataType.TEXT,
    },
    game_id: {
        type: DataType.STRING,
    },
    winner: {
        type: DataType.TEXT,
    }	
}, {
    timestamps: false
})

module.exports = Game_chess