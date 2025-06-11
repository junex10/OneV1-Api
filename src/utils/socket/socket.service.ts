import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MessageBody } from '@nestjs/websockets';
import SocketEvents from './socket.events';
import { Chats, ChatSession, ChatUsers, Person, User } from 'src/models';
import {
  GetLogs,
  SocketCoordinates,
  SocketNewChatMessage,
  SocketNewPicChatMessage,
} from './socket.entity';
import * as fs from 'fs';
import * as path from 'path';
import Hash from '../hash';
import * as moment from 'moment';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(Chats) private chatsModel: typeof Chats,
    @InjectModel(ChatUsers) private chatUsersModel: typeof ChatUsers,
    @InjectModel(ChatSession) private chatSessionModel: typeof ChatSession,
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

  private hashPic = (fileName: string, mimeType: string) => {
    let format = '';
    switch (mimeType) {
      case 'image/jpeg':
        format = 'jpg';
        break;

      case 'image/png':
        format = 'png';
        break;

      case 'image/png':
        format = 'png';
        break;

      case 'video/mp4':
        format = 'mp4';
        break;

      case 'video/x-msvideo':
        format = 'avi';
        break;

      case 'video/x-ms-wmv':
        format = 'wmv';
        break;

      case 'video/quicktime':
        format = 'mov';
        break;

      case 'video/3gpp':
        format = '3gp';
        break;

      case 'video/x-flv':
        format = 'flv';
        break;

      case 'image/gif':
        format = 'gif';
        break;

      case 'application/pdf':
        format = 'pdf';
        break;

      default:
        format = 'jpg';
        break;
    }
    return `${Hash.makeSync(fileName + moment().format('YYYYMMDDHHmmss'))
      .replace(/\//g, '')
      .replace(/\./g, '')
      .replace(/,/g, '')}.${format}`;
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
    const hashedFileName = this.hashPic(
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
}
