import express from "express";

const profileRoutes = require("./routes/profile");
const movieRoutes = require("./routes/movie");
const achievementRoutes = require("./routes/achievement");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err: any) => {
    console.log(err.message);
  });

app.use("/api/profile", profileRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/achievement", achievementRoutes);
