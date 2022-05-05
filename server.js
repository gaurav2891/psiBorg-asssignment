const mongoose = require("mongoose");

const app = require("./app");

mongoose
  .connect("mongodb://localhost/assignment")
  .then(() => console.log(`Database connecterd successfully`))
  .catch((err) => console.log(err));

app.listen(8000, (req, res) => {
  console.log(`app is running on http://127.0.0.1:8000`);
});
