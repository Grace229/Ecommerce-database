const express = require("express");
const cors = require("cors")
const bodyparser = require('body-parser');
const app = express();
var port = process.env.PORT || 5000
app.listen(port,() => console.log(`listening on port ${port} ...`));

//parse request of content-type application/json
app.use(bodyparser.json());
app.use(cors())

//parse content type application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended: false}));

app.get("/",(req, res) =>{
    res.json(`welcome to our nodejs application`);
});
var Users = require("./routes/Users")
app.use("/users", Users)

require("./routes/products_routes.js")(app);
require("./routes/orders_routes.js")(app);

