/**
 * Mongoose model Post.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  replies: {
    type: Number,
    default: 0
  },
  replyto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  likes: [
    {
      username: String
    }
  ]
}, {
  timestamps: true
})

export const Post = mongoose.model('Post', schema)
