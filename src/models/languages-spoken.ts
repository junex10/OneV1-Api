import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  Interests,
  User,
  Languages
} from '.';



@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'languages_spoken'
})
export class LanguagesSpoken extends Model {

    @Column
    name: number;

    @BelongsTo(() => User, 'user_id')
    user: User;

    @BelongsTo(() => Languages, 'language_id')
    language: Languages;

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