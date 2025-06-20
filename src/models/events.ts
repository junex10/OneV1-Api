import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  DefaultScope,
  HasMany,
} from 'sequelize-typescript';
import { EventsType, EventsUsersJoined, User } from '.';

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

  @HasMany(() => EventsUsersJoined, 'event_id')
  users_joined_event: EventsUsersJoined;

  @Column
  title: string;

  @Column
  main_pic: string;

  @Column
  content: string;

  @Column
  latitude: string;

  @Column
  longitude: string;

  @Column
  address: string;

  @Column
  likes: number;

  @Column
  status: number;

  @Column
  starting_event: Date;

  @Column
  users_joined: number;

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
