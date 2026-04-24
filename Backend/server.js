const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users",require("./routers/users"));
app.listen(3001, () =>{
    console.log("server draait op poort 3001");
})