import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { User, ChatSession } from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'chats_users',
})
export class ChatUsers extends Model {
  @BelongsTo(() => ChatSession, 'chat_session_id')
  chat_session: ChatSession;

  @BelongsTo(() => User, 'user_id')
  sender: User;

  @Column
  chat_session_id: number;

  @Column
  user_id: number;

  @Column
  viewed: number;

  @CreatedAt
  @Column
  created_at: Date;

  @UpdatedAt
  @Column
  updated_at: Date;

  @DeletedAt
  @Column
  deleted_at: Date;
}
