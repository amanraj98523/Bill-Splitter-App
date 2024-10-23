const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config/db.config");
const router = require("./routes/expenseRoutes");
// const router = require("./routes/eventRoutes");
// const expenseRoutes = require('./routes/expenseRoutes');
// const authRoutes = require('./routes/authRoutes');


require("dotenv").config();

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  console.log("Server is up!");
  res.send("Server is up and running!");
});

app.use("/bill",router)



app.listen(port, async () => {
  try {
    await connectToDatabase();
    console.log(`Server is running at port ${port}`);
  } catch (error) {
    console.log(error);
  }
});