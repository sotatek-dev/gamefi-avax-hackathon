// import {
//     ConnectedSocket,
//     MessageBody,
//     OnMessage,
//     SocketController,
//     SocketIO,
// } from "socket-controllers";
// import { Server, Socket } from "socket.io";

// var numClients = {};
// var clientNames = {};
// var rematchCounter = 0;

// @SocketController()
// export class RoomController {
//     @OnMessage("joinGameLobby")
//     public async joinGameLobby(
//         @SocketIO() io: Server,
//         @ConnectedSocket() socket: Socket,
//         @MessageBody() message: any
//     ) {
//         console.log('joinGameLobby');
//         const { gameId } = message;
//         socket.join(gameId);
//         console.log(gameId);
//         socket.room = gameId;
//         if (numClients[gameId] === undefined) {
//             numClients[gameId] = 1;
//         }
//         else {
//             numClients[gameId] += 1;
//         }
//         if (clientNames[gameId] === undefined) {
//             clientNames[gameId] = [];
//         }
//         clientNames[gameId].push(room.username);
//         console.log(clientNames[gameId]);
//     }

//     @OnMessage("update_waiting_games")
//     public async updateWaitingGames(
//         @SocketIO() io: Server,
//         @ConnectedSocket() socket: Socket,
//     ) {
//         const arr = Array.from(io.sockets.adapter.rooms);
//         const filtered = arr.filter(room => !room[1].has(room[0]))
//         const pendingRooms = filtered.filter(room => room[1].size == 1)
//         console.log(pendingRooms, 'pendingRooms');

//         const res = pendingRooms.map(i => i[0]);
//         console.log(res, 'update_waiting_games');
//         socket.emit("list_room", { rooms: res });
//     }
// }