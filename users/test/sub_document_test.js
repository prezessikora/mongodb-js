const User = require('../src/user.js');
const assert = require('assert');

describe('Subdocuments', () => {
  it('Can create a subdoc', (done) => {
    const joe = new User({ name: 'joe', posts: [{ title: 'My first post' }] });
    joe.save().then(() => {
      User.findOne({ name: 'joe' }).then((user) => {
        assert(user.posts.length === 1);
        assert(user.posts[0].title === 'My first post');
        done();
      });
    });
  });
});
