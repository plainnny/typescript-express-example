
import {Column, Table, Model, CreatedAt, UpdatedAt, ForeignKey, PrimaryKey, AutoIncrement} from 'sequelize-typescript';
import Board from './board';
/**
 * Created by kny on 2017. 11. 6..
 */


@Table
export default class Reply extends Model<Reply> {


  @AutoIncrement
  @PrimaryKey
  @Column
  postId: number;

  @Column
  createId: number;

  @CreatedAt
  createdAt: Date;

  @Column
  updateId: number;

  @UpdatedAt
  updatedAt: Date;

  @Column
  content: string;

  @Column
  boardType: string;

  @Column
  status: string;

  @Column
  depth: number;

  @ForeignKey(() => Reply)
  @Column
  replyId: number;

  @ForeignKey(() => Board)
  @Column
  boardId: number;
}