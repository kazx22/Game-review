const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("API RUNNING"));

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/game", require("./routes/api/game"));
app.use("/api/comment", require("./routes/api/comment"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is Listening to ${PORT}`));
