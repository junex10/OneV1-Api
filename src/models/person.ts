import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import {} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'person',
})
export class Person extends Model {
  @Column
  name: string;

  @Column
  lastname: string;

  @Column
  username: string;

  @Column
  subscribers: string;

  @Column
  phone: string;

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
