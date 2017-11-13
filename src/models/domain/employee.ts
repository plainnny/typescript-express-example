import {Table, Column, Model, CreatedAt, UpdatedAt, AllowNull, ForeignKey} from 'sequelize-typescript';
import Team from './team';

@Table
export default class Employee extends Model<Employee> {

	@Column
  name: string;

	@Column
  address: string;

	@ForeignKey(() => Team)
  @Column
  teamId: number;
}