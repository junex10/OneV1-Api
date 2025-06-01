import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'notifications'
})
export class Notifications extends Model {

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