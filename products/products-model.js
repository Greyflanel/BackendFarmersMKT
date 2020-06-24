const db = require("../data/db-config");

const find = () => {
    return db('products');
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

const remove = (filter) => {
    return db("products").where(filter).del();
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove
};