import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001)
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private _clients: Map<string, Socket> = new Map<string, Socket>();

  afterInit(server: Server) {
    Logger.log('App Gateway Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    Logger.log(`New client connected...: ${client.id}`);
    this._clients.set(client.id, client);
    client.emit('connected', 'Successfully connected to the server.');
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`);
    this._clients.delete(client.id);
  }

  emit(eventName: string, payload: any): void {
    Array.from(this._clients.values()).forEach((client) =>
      client.emit(eventName, payload)
    );
  }
}
