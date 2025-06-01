import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: 'password_resets',
  paranoid: true
})
export class PasswordReset extends Model {
  @Column
  user_id: number;

  @Column
  code: string;

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