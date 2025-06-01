import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, HasMany } from "sequelize-typescript";
import {
  Permissions
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'levels'
})
export class Level extends Model {

  @Column
  name: string;

  @Column
  code: string;

  @HasMany(() => Permissions, 'level_id')
  permissions: Permissions[];

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