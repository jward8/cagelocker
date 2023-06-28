const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(cors());
app.length("/api", async (req, res) => {
    res.send({data: "received"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
