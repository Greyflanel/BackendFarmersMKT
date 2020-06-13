const db = require("./data/db-config");

module.exports = {
  add,
  find,
  update,
  remove,
};

const add = async (user) => {
  await db("users")
    .insert(user, ["*"])
    .then((u) =>
      find({
        id: u[0].id,
      }).first()
    );
};

const find = async (filters) => {
  // if filters were passed in, search by filter. otherwise return all
  // note that neither return use the .first() method -- it's on a use-by-use basis if that is required or not
  if (filters) {
    await db("users").select("id", "email", "isAdmin").where(filters);
  }
  await db("users").select("id", "email", "isAdmin");
};

const update = async (filter, changes) => {
    // Uses .first() in order to limit updates to one at a time
    await db("users")
        .update(changes, ["*"])
        .where(filter)
    .then(u => find({id: u[0].id}).first())
}

const remove = async (filter) => {
    // only returns amount of deleted entries
    await db("users")
        .where(filter)
        .del();
}