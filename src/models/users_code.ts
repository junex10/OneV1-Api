import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'users_code',
})
export class UsersCode extends Model {
  @Column
  code: number;

  @Column
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @Column
  status: number;
}
