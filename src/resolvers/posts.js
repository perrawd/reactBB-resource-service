/**
 * GraphQL posts resolver.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */

import authUser from '../utils/auth.js'
import { Post } from '../models/post.js'
import { Thread } from '../models/thread.js'
import { AuthenticationError } from 'apollo-server-express'

// Provide resolver functions for your schema fields
const postResolvers = {
  Query: {
    /**
   * Get all posts.
   *
   * @returns {object} the posts.
   */
    async getPosts () {
      try {
        const posts = Post.find()
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Get a specific post.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
     * @returns {object} The server app.
     */
    async getPostByID (_, args) {
      try {
        const posts = Post.findById(args.id)
        return posts
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    /**
   * Add post.
   *
   * @param {object} _ parent.
   * @param {object} args arguments.
   * @param {object} context context.
   * @returns {object} The created post.
   */
    addPost: async (_, args, context) => {
      try {
        const user = authUser(context)
        const response = await Post.create({
          ...args,
          author: user.username
        })

        if (args.replyto !== null || args.replyto !== undefined) {
          await Post.findByIdAndUpdate(
            response.replyto,
            {
              $inc: { replies: 1 }
            },
            { useFindAndModify: false }
          )
        }

        await Thread.findByIdAndUpdate(
          response.thread,
          {
            $push: { posts: response._id }
          },
          { useFindAndModify: false }
        )

        return response
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Update post.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
     * @param {object} context context.
     * @returns {object} The created post.
     */
    editPost: async (_, args, context) => {
      try {
        authUser(context)
        await Post.updateOne(
          { _id: args.id },
          {
            ...args
          })

        return {
          success: true,
          message: 'Post updated'
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Delete post.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
     * @param {object} context context.
     * @returns {object} a response.
     */
    deletePost: async (_, args, context) => {
      try {
        const user = authUser(context)
        console.log(user)
        const post = await Post.findOne({ _id: args.id })

        if (post.author === user.username) {
          post.remove()

          return {
            success: true,
            message: 'Post deleted'
          }
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
    /**
     * Add Likes.
     *
     * @param {object} _ parent.
     * @param {object} args arguments.
     * @param {object} context context.
     * @returns {object} a response.
     */
    addLikes: async (_, args, context) => {
      try {
        const { username } = authUser(context)
        // console.log(user)
        console.log(args)
        const post = await Post.findById(args.id)

        post.likes.find((like) => like.username === username)
          ? post.likes = post.likes.filter((like) => like.username !== username)
          : post.likes.push({
            username
          })

        await post.save()

        return {
          success: true,
          message: 'Like added'
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Post: {
    /**
     * Return object of threads.
     *
     * @param {object} post the parent.
     * @returns {object} The object.
     */
    thread: async (post) => {
      return (await post.populate('thread').execPopulate()).thread
    },
    /**
     * Return object of threads.
     *
     * @param {object} subcategory the parent.
     * @returns {object} The object.
     */
    replyto: async (subcategory) => {
      return (await subcategory.populate('replyto').execPopulate()).replyto
    }
  }
}

export default postResolvers
