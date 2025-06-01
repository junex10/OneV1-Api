import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  Interests,
  User
} from '.';


@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'likes'
})
export class Likes extends Model {

    @Column
    name: number;

    @BelongsTo(() => User, 'like_user_id')
    like_user: User;

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