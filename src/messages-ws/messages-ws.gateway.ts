import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { MessagesWsService } from './messages-ws.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) {}

  handleConnection(client: Socket) {
    // console.log({ client });
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      client.disconnect();
      return;
    }
    console.log({ payload });

    // console.log('cliente contectado', client.id);
    this.messagesWsService.registerClient(client);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    // console.log('cliente desconectado', client.id);
    this.messagesWsService.removeClient(client.id);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  //message-from-client
  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    // console.log('message-from-client', payload, client.id);

    //! Emite unicamente al cliente que envio el mensaje
    // client.emit('message-from-server', {
    //   message: payload.message || 'no-message!!',
    //   fullName: 'Soy yo'
    // });

    //! Emite a todos los clientes conectados MENOS al inicial
    // client.broadcast.emit('message-from-server', {
    //   message: payload.message || 'no-message!!',
    //   fullName: 'Soy yo'
    // });

    //! Emite a todos los clientes conectados
    this.wss.emit('message-from-server', {
      message: payload.message || 'no-message!!',
      fullName: 'Soy yo'
    });
  }
}
