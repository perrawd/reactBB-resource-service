/**
 * Mongoose model Post.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

const mongoose = require('mongoose')

// Create a schema.
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// Create a model using the schema.
const Post = mongoose.model('Post', schema)
module.exports = Post
