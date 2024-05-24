const app = require("./app");
const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const path = require("path");
// const PORT = 4000



dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is Running! on : http://localhost:${process.env.PORT}`
  );
});

