import {
  Table, Column, Model, CreatedAt, UpdatedAt, AllowNull, ForeignKey, PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';
import Board from './board';

@Table
export default class Reply extends Model<Reply> {

  @AutoIncrement
  @PrimaryKey
  @Column
  postId: number;

  @Column
  content: string;

  @Column
  depth: number;

  @ForeignKey(() => Board)
  @Column
  boardId: number;

}