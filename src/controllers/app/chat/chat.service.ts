import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, ChatSession, Chats, ChatUsers, Level, Person } from 'src/models';
import { MailerService } from '@nestjs-modules/mailer';
import {
  DeleteDTO,
  GetChatsDTO,
  GetLogsDTO,
  NewChatDTO,
  NewMessageDTO,
  ViewedDTO,
} from './chat.entity';
import { Constants, Globals } from 'src/utils';
import { Op } from 'sequelize';
import * as fs from 'fs';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Chats) private chatModel: typeof Chats,
    @InjectModel(ChatSession) private chatSessionModel: typeof ChatSession,
    @InjectModel(ChatUsers) private chatUsersModel: typeof ChatUsers,
  ) {}

  getChats = async (request: GetChatsDTO) => {
    const chats = await this.chatUsersModel.findAll({
      where: {
        user_id: request.user_id,
      },
      include: [{ model: ChatSession }],
    });
    const sessions = chats.map((item) => item.chat_session.id);
    const getOtherUser = await this.chatUsersModel.findAll({
      where: {
        user_id: {
          [Op.ne]: request.user_id,
        },
        chat_session_id: {
          [Op.in]: sessions,
        },
      },
      include: [
        {
          model: User,
          attributes: ['email', 'id', 'photo'],
          include: [{ model: Person, attributes: ['name', 'lastname'] }],
        },
        'chat_session',
      ],
    });

    let data = [];
    for await (const item of getOtherUser) {
      const lastMessage = await this.chatModel.findOne({
        where: {
          chat_session_id: item.chat_session.id,
        },
        order: [['id', 'desc']],
      });
      data.push({
        item,
        lastMessage: lastMessage?.message,
        lastDateMessage: lastMessage?.created_at,
      });
    }

    return data;
  };

  newChat = async (request: NewChatDTO) => {
    const chats = await this.getChats({ user_id: request.sender_id });
    const session = chats.map((value) => value.item.chat_session_id);

    const searchChats = await this.chatUsersModel.findAll({
      where: {
        chat_session_id: {
          [Op.in]: session,
        },
      },
    });

    const ignoreChats = searchChats
      .map(
        (item: unknown) =>
          (item as { user_id: number })?.user_id !== request.sender_id && item,
      )
      .filter((x) => x !== false);

    for await (const item of ignoreChats) {
      const value = (item as { user_id: number })?.user_id;
      if (value === request.receiver_id) {
        return null;
      }
    }

    const chatSession = await this.chatSessionModel.create({
      host_id: request.sender_id,
      name: request.name,
    });

    if (chatSession) {
      if (request.receiver_id) {
        await this.chatUsersModel.create({
          chat_session_id: chatSession.id,
          user_id: request.receiver_id,
          viewed: Constants.CHATS.VIEWED.UNREAD,
        });
      }
      await this.chatUsersModel.create({
        chat_session_id: chatSession.id,
        user_id: request.sender_id,
        viewed: Constants.CHATS.VIEWED.UNREAD,
      });

      return chatSession;
    }
    return null;
  };

  newMessage = async (request: NewMessageDTO, files: Express.Multer.File[]) => {
    const chat = await this.chatModel.create({
      chat_session_id: request.session_id,
      sender_id: request.sender_id,
      message: request.message,
    });
    if (chat) {
      if (files.length > 0) {
        const attachment = files.map((item) => ({
          chat_id: chat.id,
          attachment: `chat/${item.filename}`,
        }));
      }
      await this.chatUsersModel.update(
        {
          viewed: Constants.CHATS.VIEWED.UNREAD,
        },
        {
          where: {
            chat_session_id: request.session_id,
            user_id: {
              [Op.ne]: request.sender_id,
            },
          },
        },
      );
      return chat;
    }
    return null;
  };

  getLogs = async (request: GetLogsDTO) => {
    const logs = await this.chatModel.findAll({
      where: { chat_session_id: request.chat_session_id },
      include: ['attachments_chats'],
    });
    const chat = await this.chatSessionModel.findOne({
      where: { id: request.chat_session_id },
    });
    return {
      logs,
      photo: chat.attachment,
    };
  };

  delete = async (request: DeleteDTO): Promise<boolean> => {
    const host = await this.chatSessionModel.findOne({
      where: {
        id: request.chat_session_id,
        host_id: request.host_id,
      },
    });
    if (host) {
      const chat = await this.chatModel.destroy({
        where: { chat_session_id: request.chat_session_id },
      });
      if (chat) {
        await this.chatUsersModel.destroy({
          where: { chat_session_id: request.chat_session_id },
        });
        await this.chatSessionModel.destroy({
          where: { id: request.chat_session_id },
        });
        return true;
      }
      return false;
    }
  };
  viewed = async (request: ViewedDTO): Promise<boolean> => {
    const chatViewed = await this.chatUsersModel.update(
      {
        viewed: Constants.CHATS.VIEWED.READED,
      },
      {
        where: {
          chat_session_id: request.chat_session_id,
          user_id: request.user_id,
        },
      },
    );
    if (chatViewed) return true;

    return false;
  };

  getUsers = () => {
    return this.userModel.findAll({
      include: [
        {
          model: Level,
          attributes: ['name'],
        },
        {
          model: Person,
          attributes: ['id', 'name', 'lastname'],
        },
      ],
      attributes: ['id', 'photo'],
    });
  };
}
