import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'chats_session',
})
export class ChatSession extends Model {
  @Column
  host_id: number;

  @BelongsTo(() => User, 'host_id')
  host: User;

  @Column
  status: number;

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
