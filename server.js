const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//route path
const authoRoutes = require("./routes/authRouter");
const errorHandler = require("./middelwares/errorMiddleware");
//dotenv
dotenv.config();
//mongo connection
connectDB();
//rest object
const app = express();
//middleware

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(morgan("dev"));
app.use(errorHandler);
const PORT = process.env.PORT || 8080;
//API  routes
app.use("/api/v1/auth", authoRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoute"));

app.listen(PORT, () => {
  console.log(
    `server running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white
  );
});
