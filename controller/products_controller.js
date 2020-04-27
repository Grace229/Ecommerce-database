const Product = require("../models/products_model.js");
const today = new Date();

exports.create = (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Form cannot be empty",
    });
  }

  const product = new Product({
    product_name: req.body.product_name,
    price: req.body.price,
    description: req.body.description,
    available_stock: req.body.available_stock,
    update_date: today,
  });
  // console.log(product);

  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while adding your products",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Product.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({
            message: `Not found product with id ${req.params.productId}.`,
          });
      } else {
        res
          .status(500)
          .send({
            message: "Error retrieving product with id " + req.params.productId,
          });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  Product.updateById(
    req.params.productId,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res
            .status(404)
            .send({
              message: `Not found Product with id ${req.params.productId}.`,
            });
          return;
        } else {
          res
            .status(500)
            .send({
              message: "Error updating product with id " + req.params.productId,
            });
          return;
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({
            message: `Not found Product with id ${req.params.productId}.`,
          });
      } else {
        res
          .status(500)
          .send({
            message: "Could not delete product with id " + req.params.productId,
          });
      }
    } else res.send({ message: `product was deleted successfully!` });
  });
};


exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting products.",
        });
        else res.send({ message: ` All products were deleted successfully!` });
    });
  };
