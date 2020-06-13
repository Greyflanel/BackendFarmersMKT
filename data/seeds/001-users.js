
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'Dad', password: 'ljlkljrururu'},
        {email: 'Ronald', password: 'gdgwuiihysuiweejwn'},
        {email: 'Richard', password: 'rsdrtfhflwskkd'}
      ]);
    });
};
