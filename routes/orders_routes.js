module.exports = (app) => {
    const order = require("../controller/orders_controller.js");
  
    // Add a Product
    app.post("/orders", order.create);
  
    //Retrive all Product
    app.get("/orders", order.findAll);
  
    // Retrieve one products
    app.get("/orders/:orderId", order.findOne);
  
    // Edit Product
    app.put("/orders/:orderId", order.update);
  
    // Delete Product
    app.delete("/orders/:orderId", order.delete);
  
    //Delete All Products
    app.delete("/orders", order.deleteAll)
  };
  