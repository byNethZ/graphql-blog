import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { Comment, Post, User } from "../models";

export const userTypes = new GraphQLObjectType({
  name: "UserType",
  description: "The user type",
  fields: {
    id: { type: GraphQLID },
    userName: { type: GraphQLString },
    displayName: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const postType: GraphQLObjectType = new GraphQLObjectType({
  name: "PostType",
  description: "The post type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    author: {
      type: userTypes,
      resolve(parent: any) {
        return User.findById(parent.authorId);
      },
    },
    comments: {
        type: new GraphQLList(commentType),
        resolve(parent: any) {
            return Comment.find({postId: parent.id})
        }
    }
  }),
});

export const commentType = new GraphQLObjectType({
  name: "CommentType",
  description: "The comment type",
  fields: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: { type: userTypes, resolve(parent: any) {
        return User.findById(parent.userId);
    } },
    post: { type: postType, resolve(parent: any){
        return Post.findById(parent.postId);
    } },
  },
});
