const express = require("express");
require("dotenv").config();


const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);
