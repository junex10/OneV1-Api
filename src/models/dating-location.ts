import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
    User,
    ChatSession
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'dating_location'
})
export class DatingLocation extends Model {

    @Column
    latitude: string;

    @Column
    longitude: string;

    @Column
    dating_location_text: string;

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