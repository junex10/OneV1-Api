import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import {
} from '.';

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'company_information'
})
export class CompanyInformation extends Model {

    @Column
    name: string;

    @Column
    client: string;

    @Column
    document: string;

    @Column
    email: string;

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