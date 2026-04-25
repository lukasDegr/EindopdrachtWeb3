const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users",require("./routers/users"));
app.use("/vliegtuigen", require("./routers/vliegtuig"));
app.use("/vluchten", require("./routers/vlucht"))
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});