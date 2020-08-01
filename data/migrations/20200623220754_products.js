exports.up = function (knex) {
  return knex.schema.createTable("products", (tbl) => {
    tbl.increments();
    tbl.string("product", 128).unique().notNullable();
    tbl.decimal("price", 6, 2).notNullable();
    tbl.string("product_details", 1024);
    tbl.string("product_image_url", 1024);
    tbl.decimal("remaining_product", 16, 6);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
