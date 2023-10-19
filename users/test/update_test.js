const User = require('../src/user.js');

const assert = require('assert');
const { beforeEach } = require('mocha');

describe('Updating users', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', k: '1', postCount: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation.then(() => {
      User.find({}).then((users) => {
        assert(users.filter((u) => u.name === 'Alex').length === 1);
        done();
      });
    });
  }

  it('A model instance can update', (done) => {
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });

  it('instance set n save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('A model class can update', (done) => {
    assertName(User.updateOne({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });
  it('A model class can find a record with id and update', (done) => {
    assertName(
      User.findByIdAndUpdate({ _id: joe._id }, { name: 'Alex' }),
      done
    );
  });

  it('A user can have their postcount incremented by 1', (done) => {
    User.updateMany({ name: 'Joe' }, { $inc: { postCount: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 10);
        done();
      });
  });
});

// User.find({ name: 'joe' }).then((users) => {
//   console.log(users);
//   users.forEach((u) => {
//     console.log(u.postCount);
//     u.set({ postCount: 100 });
//     u.save().then(() => {
//       User.find({}).then((users) => {
//         users.forEach((u) => {
//           console.log(u);
//           assert(u.postCount === 100);
//         });

//         done();
//       });
//     });
//   });
//});
