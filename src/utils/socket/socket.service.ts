import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { MessageBody } from '@nestjs/websockets';
import SocketEvents from './socket.events';

@Injectable()
export class SocketService {

	constructor() {

	}

}
