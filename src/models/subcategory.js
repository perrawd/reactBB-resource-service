/**
 * Mongoose model Subcategory.
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  threads: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
  },
  author: {
    type: String
  }
}, {
  timestamps: true
})

// Create a model using the schema.
export const Subcategory = mongoose.model('Subcategory', schema)
