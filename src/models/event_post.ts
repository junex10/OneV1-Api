import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  DefaultScope,
} from 'sequelize-typescript';
import { Events, User } from '.';

@DefaultScope(() => ({
  include: [
    {
      model: Events,
    },
    {
      model: User,
    },
  ],
}))
@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'events_post',
})
export class EventPost extends Model {
  @BelongsTo(() => Events, 'event_id')
  event: Events;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @Column
  user_id: number;

  @Column
  event_id: number;

  @Column
  content: string;

  @Column
  likes: number;

  @Column
  longitude: number;

  @Column
  latitude: number;

  @Column
  attachment: string;

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
