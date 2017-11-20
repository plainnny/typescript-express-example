import { expect } from "chai";
import { sequelize } from "../../../src/models/index";
import Board from "../../../src/models/domain/board";
import Reply from "../../../src/models/domain/reply";

describe("[Integration] 게시글, 댓글, 대댓글 테스트", () => {
  const cleanUp = (cb) => Board.destroy({where: {}, truncate: true}).then(() => cb());

  before((done: Function) => {
    sequelize.sync().then(() => {
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });

  beforeEach((done: Function) => {
    cleanUp(() => done());
  });

  const saveBoard = (given, cb) => {
    const board = new Board(given);
    board.save()
      .then((savedBoard: Board) => {
        //console.log(savedBoard);
        cb(savedBoard);
      });
  };

  const saveReply = (given, cb) => {
    const reply = new Reply(given);
    reply.save()
      .then((savedReply: Reply) => {
        cb(savedReply);
      });
  };


  xit('게시글을 등록하면 등록한 값이 리턴된다', (done: Function) => {

    // given
    const givenBoard = { title: 'test', content: 'board test' };

    // when
    saveBoard(givenBoard, (savedBoard: Board) => {

      // then
      expect(savedBoard.title).to.be.eql(givenBoard.title);
      done();
    });
  });

  xit('게시글에 대한 리플을 등록하면 등록 한 값이 리턴된다', (done: Function) => {

    // given
    const givenBoard = { title: 'test', content: 'board test'};
    const givenReply = { content: "리플입니다 ㅎㅎㅎ", boardId: 1 };

    // when
    saveBoard(givenBoard, (savedBoard: Board) => {
      saveReply(givenReply, (savedReply: Reply) => {

        // then
        expect(savedReply.boardId).to.be.eql(givenReply.boardId);
        done();
      });
    });
  });

  xit('게시글의 리플에 리플을 달면 그 리플의 값이 리턴된다', (done: Function) => {
    // given
    const givenBoard = { title: 'test', content: 'board test' };
    const givenReply = { content: "댓글입니다", boardId: 1 };
    const givenReReply = { content: '대댓글입니다.', boardId: 1, replyId: 1};

    // when
    saveBoard(givenBoard, (savedBoard: Board) => {
      saveReply(givenReply, (savedReply: Reply) => {
        saveReply(givenReReply, (savedReReply: Reply) => {
          done();
          console.log(savedBoard.postId);
          console.log(savedReply.postId);
          console.log(savedReReply.postId);
        });
      });
    });
  });

  xit('1번 게시글을 조회하면 게시글, 댓글을 모두 조회한다', (done: Function) => {

    // given
    const board = new Board({ title: 'register test', content: 'board and commend test' });
    const reply = new Reply({ content: '댓글', depth: 0 });

    // when
    board.save().then((savedBoad: Board) => {
      reply.save().then((savedReply: Reply) => {
        savedBoad.$add('reply', savedReply);

        Board.findOne<Board>({where: { postId: 1 }, include: [Reply]}).then((boards: Board) => {
          const test_board = boards;
          console.log(test_board);
         // expect( test_board.replies.length ).to.be.eql(1);
          done();
        });
      });
    });
  });

  it('1번 게시글을 조회하면 게시글, 댓글, 대댓글을 모두 조회한다', (done: Function) => {
    // given
    const board = new Board({ title: 'register test', content: 'board and commend test' });
    const reply = new Reply({ content: '댓글', depth: 0 });
    const reReply = new Reply({ content: '대댓글', depth: 1 });

    // when
    board.save().then((savedBoad: Board) => {
      reply.save().then((savedReply: Reply) => {
        reReply.save().then((savedReReply: Reply) => {

          savedBoad.$add('reply', savedReply);

          Board.findOne<Board>({where: { postId: 1 }, include: [Reply]}).then((boards: Board) => {
            const test_board = boards;
            console.log(test_board);
            // expect( test_board.replies.length ).to.be.eql(1);
            done();
          });
        });
      });
    });
  });

});