const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const profileRoutes = require("./routes/profileRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/profiles", profileRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
