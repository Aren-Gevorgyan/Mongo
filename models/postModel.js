const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
   user: {type: Object },
   content: { type: String },
   subTitle: {type: String },
   createAt: {type: Date },
   upgradeAt: {type: Date },
})

const posts = mongoose.model('posts', postSchema);

