/**
 * Mongoose model Category.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory'
    }
  ],
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const Category = mongoose.model('Category', schema)
