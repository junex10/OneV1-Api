import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  Interests,
  User
} from '.';


@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'reported_users'
})
export class ReportedUsers extends Model {

    @Column
    reason: string;

    @BelongsTo(() => User, 'reported_user_id')
    reported_user: User;

    @BelongsTo(() => User, 'user_id')
    user: User;

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