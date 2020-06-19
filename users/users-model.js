const db = require("../data/db-config");

module.exports = {
  add,
  find,
  findBy,
  remove,
};

const add = (user) => {
  return db('users').insert(user);
}

const find = () => {
  return db('users').select('id', 'username', 'password');
}

const findBy = (filter) => {
  return db('users').where(filter);
}

const remove = (filter) => {
    return db("users")
        .where(filter)
        .del();
}