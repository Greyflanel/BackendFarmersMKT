
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Dad", password: "ljlkljrururu" },
        { username: "Ronald", password: "gdgwuiihysuiweejwn" },
        { username: "Richard", password: "rsdrtfhflwskkd" }
      ]);
    });
};
