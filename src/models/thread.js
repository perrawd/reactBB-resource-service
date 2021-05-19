/**
 * Mongoose model Thread.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  author: {
    type: String
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true
})

schema.virtual('postCount').get(function () {
  return this.posts.length
})

// Create a model using the schema.
export const Thread = mongoose.model('Thread', schema)
