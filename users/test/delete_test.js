const { default: mongoose } = require('mongoose');
const User = require('../src/user.js');

const assert = require('assert');
const { beforeEach } = require('mocha');

describe('Deleting users', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'joe' });
    joe.save().then(() => done());
  });

  it('instance method delete', (done) => {
    joe
      .deleteOne()
      .then(() => User.findOne({ name: 'joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method delete one', (done) => {
    // Remove a bunch of records with some given criteria
    User.deleteOne({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method delete many', (done) => {
    // Remove a bunch of records with some given criteria
    User.deleteMany({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('find and delete with findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('find and delete with findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
