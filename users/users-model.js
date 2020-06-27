const db = require("../data/db-config");

const find = () => {
  return db('users');
}

const findBy = (filter) => {
  return db('users').where(filter);
}

const add = (user) => {
  return db("users").insert(user);
}


const findById = (id) => {
  return db("users").where({ id });
}

const updateUser = (id, update) => {
  return db("users").where({ id }).update(update);
};

const remove = (id) => {
    return db("users")
        .where({ id })
        .del();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateUser,
  remove
};