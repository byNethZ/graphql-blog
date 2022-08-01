import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  login,
  register,
  createPost,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
} from "./mutations";
import { post, posts, user, users, comments, comment } from "./query";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    users,
    user,
    posts,
    post,
    comments,
    comment,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    register,
    login,
    createPost,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment
  },
});

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
