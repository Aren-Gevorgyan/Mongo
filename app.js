const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require('./router/userRouter.js');
const postRouter = require('./router/postRouter.js');
const homeRouter = require('./router/homeRouter.js');

mongoose.connect("mongodb://localhost:27017/usersdb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, (err)=>{
  if(err) return console.log(err);
  app.listen("3050", () => {
    console.log("Connect success");
  });
});

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api', homeRouter);