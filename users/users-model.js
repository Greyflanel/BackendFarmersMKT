const db = require("../data/db-config");

const find = () => {
  return db('users');
}

const findByAdmin = (role) => {
  return db('users').where({role: 'admin'});
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}

const remove = (filter) => {
    return db("users")
        .where(filter)
        .del();
}

module.exports = {
  add,
  find,
  findByAdmin,
  findById,
  remove,
};