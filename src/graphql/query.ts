import { GraphQLID, GraphQLList } from "graphql";
import { Comment, Post, User } from "../models";
import { commentType, postType, userTypes } from "./types";

export const users = {
  type: new GraphQLList(userTypes),
  async resolve() {
    const usersList = await User.find();

    console.log(usersList);

    return usersList;
    //another way
    //return User.find()
  },
};

export const user = {
  type: userTypes,
  description: "Get a user by id",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    const user = await User.findById(args.id);
    return user;
  },
};

export const posts = {
  type: new GraphQLList(postType),
  description: 'Get all posts',
  resolve: () => Post.find()
}

export const post = {
  type: postType,
  description: 'Get a post by id',
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_: any, args: any) => {
    const post = await Post.findById(args.id);
    return post;
  }
}

export const comments = {
  type: new GraphQLList(commentType),
  description: 'Get all comments',
  resolve: () => Comment.find()
}

export const comment = {
  type: commentType,
  description: 'Get comment by Id',
  args: {
    id: { type: GraphQLID }
  },
  resolve: async ( _: any, args: any ) => {
    const { id } = args;
    const comment = await Comment.findById(id);
    return comment;
  }
}
//export default users;
