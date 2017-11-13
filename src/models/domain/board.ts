import {AutoIncrement, Column, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import Reply from "./reply";

@Table
export default class Board extends Model<Board> {

  @AutoIncrement
  @PrimaryKey
  @Column
  postId: number;

  @Column
  title: string;

  @Column
  content: string;

  @HasMany(() => Reply)
  replies: Reply[];
}