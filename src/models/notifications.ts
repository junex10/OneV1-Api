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
import { NotificationType } from './notification_type';
import { Events } from './events';

@DefaultScope(() => ({
  include: [
    {
      model: NotificationType,
    },
  ],
}))
@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'notifications',
})
export class Notifications extends Model {
  @BelongsTo(() => NotificationType, 'notification_type_id')
  notification_type: NotificationType;

  @BelongsTo(() => Events, 'event_id')
  event: Events;

  @Column
  title: string;

  @Column
  message: string;

  @Column
  receiver_id: number;

  @Column
  sender_id: number;

  @Column
  status: number;

  @Column
  notification_type_id: number;

  @Column
  event_id: number;

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
