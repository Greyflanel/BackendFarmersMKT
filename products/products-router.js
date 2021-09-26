const router = require("express").Router();
const Products = require("./products-model");
const verifyAuth = require("../auth/verify-auth");

router.post("/products", verifyAuth, (req, res) => {
  let product = req.body;

  Products.add(product)
    .then((product) => {
      res.status(201).json({ message: "Successfully added a product!" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/products", (req, res) => {
  Products.find()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to get products!" });
    });
});

router.get("/products/:id", (req, res) => {
  const id = req.params.id;

  Products.findById(id)
    .then((product) => {
      return res.json(product);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to get product!" });
    });
});

router.delete("/products/:id", verifyAuth, (req, res) => {
  const id = req.params.id;

  Products.remove(id)
    .then((product) => {
      return res
        .status(410)
        .json({ message: `Product id: ${id} has been deleted!` });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Failed to delete product!", error: error });
    });
});

router.put("/products/:id", verifyAuth, (req, res) => {
  const id = req.params.id;

  Products.updateProduct(id, req.body)
    .then((product) => {
      return res
        .status(200)
        .json({ message: `Product id: ${id} has been updated!` });
    })
    .catch((error) => {
      return res.status(500).json({ message: "Failed to update product!" });
    });
});

module.exports = router;
