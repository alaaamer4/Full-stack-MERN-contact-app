const express = require("express");
const app = express();
const connectDB = require("./config/DB");
const user = require("./routes/user");
const auth = require("./routes/auth");
const contact = require("./routes/contact");

//? connect to DB
connectDB();

//? call routes
// *  use body parser
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "welcome to contact API",
  });
});
app.use("/api/users", user);
app.use("/api/auth", auth);
app.use("/api/contacts", contact);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
