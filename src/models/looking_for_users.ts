import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  Interests,
  User
} from '.';


@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'looking_for_users'
})
export class LookingForUsers extends Model {

    @Column
    type: number;

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