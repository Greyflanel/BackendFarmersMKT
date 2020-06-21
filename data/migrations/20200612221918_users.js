
exports.up = function(knex) {
    return knex.schema.createTable("users", (tbl) => {
    // creates a primary key called user_id
        tbl.increments("user_id");
    // creates a text field for email address that is required and unique with max 128 characters
        tbl.string("username", 128).unique().notNullable();
    // creates a password field that is required with max 128 characters
        tbl.string("password", 128);
    // creates a role field to assign admin access with max 8 characters
        tbl.string("role", 8);    
    // creates timestamp when user is created
        tbl.timestamp("created_at").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
//   drops entire table
    return knex.schema.dropTableIfExists("users");
};
