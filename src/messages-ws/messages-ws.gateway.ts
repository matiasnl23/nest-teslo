import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  logger: Logger = new Logger(MessagesWsGateway.name);

  constructor(private readonly messagesWsService: MessagesWsService) { }

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);

    this.logger.debug(
      `Clientes connectados: ${this.messagesWsService.getConnectedClients()}`,
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.logger.debug(
      `Clientes connectados: ${this.messagesWsService.getConnectedClients()}`,
    );
  }
}
