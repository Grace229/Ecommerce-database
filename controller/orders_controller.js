const Order = require("../models/orders_model.js");
const today = new Date();

exports.create = (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Form cannot be empty",
    });
  }

  const order = new Order({
  product: req.body.product,
  quantity: req.body.quantity,
  color: req.body.color,
  size:  req.body.size,
  price: req.body.price,
  order_date: today,
  });
  // console.log(product);

  Order.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while adding your order",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Order.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Order.findById(req.params. orderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({
            message: `Not found product with id ${req.params.orderId}.`,
          });
      } else {
        res
          .status(500)
          .send({
            message: "Error retrieving product with id " + req.params.orderId,
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
  Order.updateById(
    req.params.orderId,
    new  Order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res
            .status(404)
            .send({
              message: `Not found Order with id ${req.params.orderId}.`,
            });
          return;
        } else {
          res
            .status(500)
            .send({
              message: "Error updating Order with id " + req.params.orderId,
            });
          return;
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Order.remove(req.params.orderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({
            message: `Not found  Order with id ${req.params.orderId}.`,
          });
      } else {
        res
          .status(500)
          .send({
            message: "Could not delete  Order with id " + req.params.orderId,
          });
      }
    } else res.send({ message: `Order was deleted successfully!` });
  });
};


exports.deleteAll = (req, res) => {
  Order.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting Orders.",
        });
        else res.send({ message: ` All Orders were deleted successfully!` });
    });
  };
