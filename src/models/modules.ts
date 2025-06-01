import { Column, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: 'modules'
})
export class Modules extends Model {

  @Column
  name: string;

  @Column
  icon: string;

  @Column
  code: string;

  @Column
  status: number;
}