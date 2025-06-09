import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MessageBody } from '@nestjs/websockets';
import SocketEvents from './socket.events';
import { Person, User } from 'src/models';
import { SocketCoordinates } from './socket.entity';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Person) private personModel: typeof Person,
  ) {}

  setUserLocation = async (coordinates: SocketCoordinates) => {
    await this.personModel.update(
      {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
      {
        where: {
          user_id: coordinates.user_id,
        },
      },
    );
  };
}
