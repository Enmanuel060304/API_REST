const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hola mundo desde express xddd");
});

app.listen(PORT, () => console.log("app listen on port ", PORT));
