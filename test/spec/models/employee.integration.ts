import {expect} from "chai";
import {sequelize} from "../../../src/models/index";
import Employee from "../../../src/models/domain/employee";
import Team from '../../../src/models/domain/team';
import Board from '../../../src/models/domain/board';
import Reply from '../../../src/models/domain/Reply';

describe("[Integration] 게시글 테스트", () => {
  const cleanUp = (cb) => Board.destroy({where: {}, truncate: true}).then(() => cb());

  before((done: Function) => {
    sequelize.sync().then(() => {
      cleanUp(() => done());
    }).catch((error: Error) => {
      done(error);
    });
  });

/*  beforeEach((done: Function) => {
    cleanUp(() => done());
  });*/

  const save = (given, cb) => {
    const board = new Board(given);
    board.save()
      .then((savedBoard: Board) => {
        cb(savedBoard);
      });
  };

  it('게시글을 등록하면 등록한 값이 리턴된다', (done: Function) => {

    // given
    const givenBoard = { title: 'test', content: 'board test', createId: 1, updateId: 1, boardType: 1 };

    // when
    save(givenBoard, (savedBoard: Board) => {

      // then
      expect(savedBoard.title).to.be.eql(givenBoard.title);
      expect(savedBoard.createId).to.be.eql(givenBoard.createId);
      done();
    });
  });

  it('게시글에 대한 리플을 등록하면 등록 한 값이 리턴된다', (done: Function) => {

    // given
    const givenReply = { createId: 1, updateId: 1, content: "리플입니다 ㅎㅎㅎ", boardType: 1, boardId: 1 };

    // when
    save(givenReply, (savedReply: Reply) => {

      expect(savedReply.createId).to.be.eql(givenReply.createId);
      expect(savedReply.boardId).to.be.eql(givenReply.boardId);
      done();
    });
  });

});


describe("[Integration] 직원 모델을 테스트 한다", () => {
	before((done: Function) => {
		sequelize.sync().then(() => {
		  done();
		}).catch((error: Error) => {
			done(error);
		});
	});

	const cleanUp = (cb) => Employee.destroy({where: {}, truncate: true}).then(() => cb());

	beforeEach((done: Function) => {
    cleanUp(() => done());
  });

	const save = (given, cb) => {
	  const employee = new Employee(given);
    employee.save()
      .then((saveEmployee: Employee) => {
        cb(saveEmployee);
      });
  };

	xit('직원을 등록할 때 등록한 값이 리턴된다', (done: Function) => {

	  // given
	  let givenEmployee = {name: 'test', address: 'jeju'};

	  // when
    save(givenEmployee, (saveEmployee: Employee) => {
      // then
      expect(saveEmployee.name).to.be.eql(givenEmployee.name);
      expect(saveEmployee.address).to.be.eql(givenEmployee.address);
      done();
    });
  });

	xit('등록한 직원을 조회할 때 조회된다', (done: Function) => {

    // given
    let givenEmployee = {name: 'test', address: 'jeju'};

    // when & then
    save(givenEmployee, (saveEmployee: Employee) => {
      Employee.findAll<Employee>().then((employees: Employee[]) => {
        expect(employees.length).to.be.eql(1);
        done();
      });
    });
  });

	xit('rose 라는 직원을 검색하는 경우 rose 직원의 정보가 리턴된다', (done: Function) => {

    // given
    let givenEmployee = {name: 'rose', address: 'jeju'};

    // when
    save(givenEmployee, (saveEmployee: Employee) => {
      Employee.findOne<Employee>({where: {name: 'rose'}})
        .then((employee: Employee) => {
          expect(employee.name).to.be.eql(givenEmployee.name);
          done();
        });
    });
  });

	xit('apple, go 라는 직원 중에 apple 직원을 검색하는 경우 apple 직원의 정보가 리턴된다', (done: Function) => {

    const apple = {name: 'apple', address: 'jeju'};
    const go = {name: 'go', address: 'jeju'};

    // when
    save(apple, () => {
      save(go, () => {
        Employee.findOne<Employee>({where: {name: 'apple'}}).then((employee: Employee) => {
          expect(employee.get('name')).to.be.eql(apple.name);
          done();
        });
      });
    });
  });

	xit('it라는 부서에 apple유저를 등록한다', (done: Function) => {

	  const it_department = new Team({name: 'it'});
	  const apple = new Employee({name: 'apple', address: 'jeju'});

	  it_department.save()
      .then((saveTeam: Team) => {
	      apple.save().then((user: Employee) => {
	        saveTeam.$add('employee', user);
	        Team.findAll<Team>({include: [Employee]}).then((teams: Team[]) => {
	          const team = teams[0];
	          expect(team.employees.length).to.be.eql(1);
            done();  
          });
        });
      });
  });
});

