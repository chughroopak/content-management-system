const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

const app = express();

app.use(express.json());

//DB config
const db = require("./config/keys").mongoURI;

//MongoDB connection
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//Middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//USE Routes
app.use("/api/users/", users);
app.use("/api/posts", posts);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
