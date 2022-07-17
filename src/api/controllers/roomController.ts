import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class RoomController {
  @OnMessage("join_game")
  public async joinGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log("New User joining room: ", message);

    const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
    console.log(connectedSockets, 'connectedSockets');
    
    const socketRooms = Array.from(socket.rooms.values()).filter(
      (r) => r !== socket.id
    );

    if (
      socketRooms.length > 0 ||
      (connectedSockets && connectedSockets.size === 2)
    ) {
      socket.emit("room_join_error", {
        error: "Room is full please choose another room to play!",
      });
    } else {
      await socket.join(message.roomId);
      console.log(io.sockets.adapter.rooms, 'io.sockets.adapter.rooms');
      socket.emit("room_joined");
      if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
        socket.emit("start_game", { start: true, symbol: "o" });
        socket
          .to(message.roomId)
          .emit("start_game", { start: false, symbol: "x" });
      }
    }
  }

  @OnMessage("update_waiting_games")
  public async updateWaitingGames(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
  ) {
    const arr = Array.from(io.sockets.adapter.rooms);
    const filtered = arr.filter(room => !room[1].has(room[0]))
    const pendingRooms = filtered.filter(room => room[1].size == 1)
    const res = pendingRooms.map(i => i[0]);
    console.log(res, 'update_waiting_games');
    socket.emit("list_room", { rooms: res });
  }
}
