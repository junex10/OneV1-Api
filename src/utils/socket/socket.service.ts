import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import SocketEvents from './socket.events';
import {
  Chats,
  ChatSession,
  ChatUsers,
  Events,
  Person,
  User,
} from 'src/models';
import {
  GetLogs,
  SocketCheckNewEventIncoming,
  SocketCoordinates,
  SocketNewChatMessage,
  SocketNewPicChatMessage,
} from './socket.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Op } from 'sequelize';
import { Globals, Constants } from '..';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(Chats) private chatsModel: typeof Chats,
    @InjectModel(ChatUsers) private chatUsersModel: typeof ChatUsers,
    @InjectModel(ChatSession) private chatSessionModel: typeof ChatSession,
    @InjectModel(Events) private eventsModel: typeof Events,
  ) {}

  private getLogs = async (request: GetLogs) => {
    const chatSessions = await this.chatUsersModel.findAll({
      where: {
        user_id: [request.user_id, request.other_user_id],
      },
      attributes: ['chat_session_id', 'user_id'],
      raw: true,
    });

    const sessionUserMap = {};
    chatSessions.forEach(({ chat_session_id, user_id }) => {
      if (!sessionUserMap[chat_session_id])
        sessionUserMap[chat_session_id] = new Set();
      sessionUserMap[chat_session_id].add(user_id);
    });

    const sessionId = Object.entries(sessionUserMap).find(([, userSet]) => {
      const set = userSet as Set<number>;
      return (
        set.has(request.user_id) &&
        set.has(request.other_user_id) &&
        set.size === 2
      );
    })?.[0];
    let chatSession;
    chatSession = await this.chatSessionModel.findOne({
      where: { id: sessionId },
    });
    const logs = await this.chatsModel.findAll({
      where: { chat_session_id: Number(sessionId) },
      order: [['created_at', 'ASC']],
    });
    return { logs, chat_session: chatSession };
  };

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
  newMessage = async (request: SocketNewChatMessage) => {
    await this.chatsModel.create({
      chat_session_id: request.chat_session_id,
      sender_id: request.sender_id,
      message: request.message,
    });
    const logs = await this.getLogs({
      user_id: request.sender_id,
      other_user_id: request.other_user_id,
    });
    return logs;
  };

  newPicMessage = async (request: SocketNewPicChatMessage) => {
    const { attachment } = request;
    // Always resolve from project root
    const dir = path.resolve(process.cwd(), 'public', 'storage', 'chat');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // Use hashed filename for saving
    const hashedFileName = Globals.hashPic(
      attachment?.fileName,
      attachment?.mimeType,
    );
    const filePath = path.join(dir, hashedFileName);
    fs.writeFileSync(filePath, Buffer.from(attachment.base64, 'base64'));
    // Save the relative path in DB
    await this.chatsModel.create({
      chat_session_id: request.chat_session_id,
      sender_id: request.sender_id,
      attachment: `chat/${hashedFileName}`,
    });
    const logs = await this.getLogs({
      user_id: request.sender_id,
      other_user_id: request.other_user_id,
    });
    return logs;
  };

  onNewEventIncoming = async (request: SocketCheckNewEventIncoming) => {
    //  Return currently active events that we are hosting and sending to the APP (Later: notify all our followers thro push notifications)
    const activeEvents = await this.eventsModel.findAll({
      where: {
        user_id: request.user_id,
        status: Constants.EVENT_STATUS.ACTIVE,
      },
    });

    return activeEvents;
  };

  // Crons

  checkActiveEvents = async () => {
    const now = new Date();

    // Update events that have expired but not yet marked as FINISHED
    await this.eventsModel.update(
      { status: Constants.EVENT_STATUS.FINISHED },
      {
        where: {
          expiration_time: { [Op.lt]: now },
          status: Constants.EVENT_STATUS.ALMOST_FINISHED, //(THEY ARE ALMOST FINISHED IN STATUS SO WE SWAP IT TO FINISHED)
        },
      },
    );

    // Update events that are ongoing (started but not expired) to ACTIVE
    await this.eventsModel.update(
      { status: Constants.EVENT_STATUS.ACTIVE },
      {
        where: {
          starting_event: { [Op.lte]: now },
          expiration_time: { [Op.gt]: now },
          status: Constants.EVENT_STATUS.PENDING, // THEY'RE PENDING AND WE UPDATE THEIR STATUS TO ACTIVE
        },
      },
    );

    // Delete events where expiration_time is more than 12 hours ago
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
    await this.eventsModel.destroy({
      where: {
        expiration_time: { [Op.lt]: twelveHoursAgo },
      },
    });
  };
}
