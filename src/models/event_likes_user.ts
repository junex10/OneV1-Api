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
import { Level, Events, User } from '.';

@DefaultScope(() => ({
  include: [
    {
      model: Level,
    },
  ],
}))
@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'event_likes_user',
})
export class EventLikesUser extends Model {
  @BelongsTo(() => Events, 'event_id')
  event: Events;

  @BelongsTo(() => User, 'user_id')
  user: User;

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
