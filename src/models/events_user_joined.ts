import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { Events } from './events';
import { User } from './user';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'events_users_joined',
})
export class EventsUsersJoined extends Model {
  @BelongsTo(() => Events, 'event_id')
  event: Events;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @Column
  event_id: number;

  @Column
  user_id: number;

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
