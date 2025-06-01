import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  Interests,
  User
} from '.';


@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'interests_users'
})
export class InterestsUsers extends Model {

    @BelongsTo(() => Interests, 'interest_id')
    interest: Interests;

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