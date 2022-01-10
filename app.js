const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require('./router/userRouter.js');
const homeRouter = require('./router/homeRouter.js');

mongoose.connect("mongodb://localhost:27017/usersdb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, (err)=>{
  if(err) return console.log(err);
  app.listen("3030", () => {
    console.log("Connect success");
  });
});

app.use('/api/users', userRouter);
app.use('/', homeRouter);