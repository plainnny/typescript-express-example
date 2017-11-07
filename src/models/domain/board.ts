import {Table, Column, Model, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table
export default class Board extends Model<Board> {

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
  boardId: number;

  @Column
  title: string;

  @Column
  content: string;

  @Column
  boardType: string;

  @Column
  status: number;

}