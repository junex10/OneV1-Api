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
import { EventsType, User } from '.';

@DefaultScope(() => ({
  include: [
    {
      model: EventsType,
    },
    {
      model: User,
    },
  ],
}))
@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'events',
})
export class Events extends Model {
  @BelongsTo(() => EventsType, 'event_type_id')
  event_type: EventsType;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @Column
  main_pic: string;

  @Column
  content: string;

  @Column
  latitude: string;

  @Column
  longitude: string;

  @Column
  likes: number;

  @Column
  status: number;

  @Column
  expiration_time: Date;

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
