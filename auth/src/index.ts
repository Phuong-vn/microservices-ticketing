import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const { json } = bodyParser;

app.use(json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("Current User");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
