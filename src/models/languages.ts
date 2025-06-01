import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
    User,
    ChatSession
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'languages'
})
export class Languages extends Model {

    @Column
    name: string;

    @Column
    short_name: string;

}