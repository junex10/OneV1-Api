import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, BelongsTo } from "sequelize-typescript";
import {
  Interests,
  User
} from '.';


@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'work_education'
})
export class WorkEducation extends Model {

    @Column
    work: string;

    @Column
    company: string;

    @Column
    high_school: string;

    @Column
    college: string;

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