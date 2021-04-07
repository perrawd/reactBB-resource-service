/**
 * Mongoose model Post.
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
  subcategories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory'
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// Create a model using the schema.
export const Post = mongoose.model('Category', schema)
