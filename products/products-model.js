const db = require("../data/db-config");

const find = () => {
    return db('products').select("id", "product", "price", "product_details", "product_image_url", "remaining_product");
}

const findBy = (filter) => {
    return db('products').where(filter);
}

const add = (product) => {
    return db("products").insert(product);
};

const findById = (id) => {
    return db("products").where({ id });
}

const updateProduct = (id, update) => {
    return db('products').where({ id }).update(update)
}

const remove = (id) => {
    return db("products").where({ id }).del();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    updateProduct,
    remove
};