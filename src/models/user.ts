import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, DefaultScope, HasOne } from "sequelize-typescript";
import {
  Permissions,
  Level,
  Person
} from '.';

@DefaultScope(() => ({
  include: [{
    model: Level
  }]
}))

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'users'
})
export class User extends Model {

  @Column
  email: string;

  @Column
  password: string;

  @Column
  level_id: number;

  @BelongsTo(() => Level, 'level_id')
  level: Level;

  @Column
  token: string;

  @Column
  photo: string;

  @Column
  verified: number;

  @Column
  status: number;

  @HasOne(() => Person, 'user_id')
  person: Person;

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