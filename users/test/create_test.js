const { default: mongoose } = require('mongoose');
const User = require('../src/user.js');

const assert = require('assert');

describe('Tests user collection', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' });
    joe.save().then(() => {
      assert(!joe.isNew);
      done();
    });
  });
});
