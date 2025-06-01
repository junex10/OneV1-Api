import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'interests'
})
export class Interests extends Model {

    @Column
    name: string;
}