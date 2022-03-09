const express = require("express");
const { getAllUser, createUser } = require("./db_helper");
const app = express();
const PORT = process.env.PORT || 3000;

function createError(status, message) {
  var err = new Error(message);
  err.status = status;
  return err;
}

app.get("/", (req, res) => {
  res.send("root endpoint");
});

app.get("/users/allCount", async (req, res) => {
  const allUser = await getAllUser();
  console.log(allUser);
  res.send(`there are ${allUser.length} user`);
});
app.get("/users/create", async (req, res) => {
  const name = req.query.name;
  const age = parseInt(req.query.age);
  const email = req.query.email;
  if (name == undefined || isNaN(age) || email == undefined) {
    res.send("you must pass name,age,email by query param");
  } else {
    const result = await createUser([name, age, email]);
    console.log(name);
    console.log(age);
    console.log(email);
    if (result) {
      res.send("created user");
    } else {
      res.send("failed to create user");
    }
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const allUser = await getAllUser();
  console.log(allUser[userId]);
  res.send(
    `the user infomation of id:${userId} ${JSON.stringify(allUser[userId - 1])}`
  );
});

app.listen(PORT, () => {
  console.log(`listening at ${PORT}poort`);
});
