const user = require("./models/userModel");
const mongoose = require("mongoose");
const app = require("./app");
const userController = require("./controllers/userController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("db connection succesful");
  });

app
  .route("/eb")
  .get(userController.getAllUser)
  .post(userController.createUser)
  .delete(userController.deleteUsers)
  .patch(userController.updateUsers)
  .put(userController.upsert);
const port = 3000;
app.listen(port, () => {
  console.log(`server runing on port no ${port}`);
});
