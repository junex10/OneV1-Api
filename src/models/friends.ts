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
import { User } from '.';

@DefaultScope(() => ({
  include: [
    { model: User, as: 'sender' },
    { model: User, as: 'receiver' },
  ],
}))
@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'friends',
})
export class Friends extends Model {
  @Column
  sender_id: number;

  @Column
  receiver_id: number;

  @BelongsTo(() => User, { foreignKey: 'sender_id', as: 'sender' })
  sender: User;

  @BelongsTo(() => User, { foreignKey: 'receiver_id', as: 'receiver' })
  receiver: User;

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
