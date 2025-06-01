import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  Interests,
  User
} from '.';


@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'life_style'
})
export class LifeStyle extends Model {

    @Column
    kids: number;

    @Column
    smoking: number;

    @Column
    drinking: number;

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