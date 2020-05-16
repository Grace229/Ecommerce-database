    const sql = require("./db.js");

// Constructor
const Order = function (order) {
  this.product = order.product;
  this.quantity = order.quantity;
  this.color = order.color;
  this.size = order.size;
  this.price = order.price;
  this.order_date = order.order_date
};

// Insert
Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orders SET ?",newOrder, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("Order added: ", { id: res.product, ...newOrder });
    result(null, { id: res.product, ...newOrder });
  });
};

Order.finOrderdById = (orderId, result) => {
  sql.query(`SELECT * FROM orders WHERE _id =   ${orderId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found order: ", res[0]);
      result(null, res[0]);
    }
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = (result) => {
  sql.query(`SELECT * FROM products`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }
    console.log("products: ", res);
    result(null, res);
  });
};

Order.updateById = (orderId, order, result) => {
  sql.query(
    `UPDATE products SET name=?, amount=?, available_stock=? WHERE _id =? `,
    [product.product_name, product.price,product.description,product.available_stock, productId],
    (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Updated Product: ");
      result(null, { _id: productId, ...product });
    }
  );
};

Order.remove = (orderId, result) => {
  sql.query(`DELETE FROM orders WHERE _id =   ${orderId}`, (err, res) => {
    if (err) {
      console.log("error:  ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted Order: ");
    result(null, res);
  });
};

Order.removeAll = (result) => {
    sql.query(`DELETE FROM orders`, (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log(" All Orders Deleted: ");
      result(null, res);
    });
  };


module.exports =  Order;
