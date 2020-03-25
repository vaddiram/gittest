const express = require("express");
let app = express();
let bodyparser = require("body-parser");
const cors = require("cors");
const userRouts = require("./routes/user");

const PORT = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cors({ 
    origin: "http://localhost:4200",
    credentials: true
}));

app.use("/user", userRouts);

app.listen(PORT, () => console.log("Server started at http://localhost:" + PORT));