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
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread'
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

schema.virtual('threadCount').get(function () {
  return this.threads.length
})

schema.virtual('last').get(function () {
  return this.threads[this.threads.length - 1]
})

schema.virtual('latestThread', {
  ref: 'Thread',
  localField: schema.virtual('last').get(function () {
    return this.threads[this.threads.length - 1]
  }),
  foreignField: '_id',
  justOne: true
})

// Create a model using the schema.
export const Subcategory = mongoose.model('Subcategory', schema)
