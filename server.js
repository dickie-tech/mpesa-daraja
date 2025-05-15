const express = require("express");
require("dotenv").config();


const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.use("/api/login", (req,res) =>{
  res.send("Login route");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);
