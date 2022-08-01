import { GraphQLID, GraphQLString } from "graphql";
import { Post, User, Comment } from "../models";
import { createJWToken } from "../util/auth";
import { commentType, postType } from "./types";

export const register = {
  type: GraphQLString,
  description: "Register a new user and return a token",
  args: {
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    console.log(args);

    const { userName, email, password, displayName } = args;

    //first way
    //const newUser = await UserInterface.create({userName, email, password, displayName})
    //console.log(newUser)

    //second way
    const user = new User({ userName, email, password, displayName });
    await user.save();

    //console.log(user);

    const token = createJWToken({
      _id: user._id,
      username: user.userName,
      email: user.email,
    });

    console.log(token);

    return token;
  },
};

export const login = {
  type: GraphQLString,
  description: "Log a user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    //console.log(args);
    const user = await User.findOne({ email: args.email }).select("+password");

    console.log(user);
    if (!user || user.password !== args.password)
      throw new Error(`Invalid credentials`);

    const token = createJWToken({
      _id: user._id,
      username: user.userName,
      email: user.email,
    });

    return token;
  },
};

export const createPost = {
  type: postType,
  description: "Create a new post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(_: any, args: any, req: any) {
    const verifiedUser = req.verifiedUser;
    console.log(verifiedUser);

    const post = new Post({
      title: args.title,
      body: args.body,
      authorId: verifiedUser._id,
    });

    await post.save();

    console.log(post);

    return post;
  },
};

export const updatePost = {
  type: postType,
  description: "Update a post",
  args: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve: async (_: any, args: any, req: any) => {
    const { id, title, body } = args;
    const { verifiedUser } = req;
    console.log(verifiedUser);
    console.log(id, title, body);

    if (!verifiedUser) throw new Error("Unauthorized");

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, authorId: verifiedUser._id },
      { title, body },
      { new: true, runValidators: true }
    );

    return updatedPost;
  },
};

export const deletePost = {
  type: GraphQLString,
  description: "Delete a post",
  args: {
    postId: { type: GraphQLID },
  },
  async resolve(_: any, args: any, req: any) {
    const { verifiedUser } = req;
    const { postId } = args;

    if (!verifiedUser) throw new Error("Unauthorized");

    const postDeleted = await Post.findOneAndDelete({
      _id: postId,
      authorId: verifiedUser._id,
    });

    if (!postDeleted) throw new Error("La publicación no fue encontrada");

    return "Post deleted";
  },
};

export const addComment = {
  type: commentType,
  description: "Add a comment to post",
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLID },
  },
  async resolve(_: any, args: any, req: any) {
    const { verifiedUser } = req;
    const { comment, postId } = args;

    if (!verifiedUser) throw new Error("Unauthorized");

    const newComment = new Comment({
      comment,
      postId,
      userId: verifiedUser._id,
    });

    return newComment.save();
  },
};

export const updateComment = {
  type: commentType,
  description: "Update a comment",
  args: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
  },
  async resolve(_: any, args: any, req: any) {
    const { verifiedUser } = req;
    const { id, comment } = args;

    if (!verifiedUser) throw new Error("Unauthorized");

    const updatedComment = await Comment.findOneAndUpdate(
      {
        _id: id,
        userId: verifiedUser._id,
      },
      {
        comment,
      },
      { new: true, runValidators: true }
    );

    if( !updatedComment ) throw new Error("Comment not found");

    return updatedComment
  },
};

export const deleteComment = {
  type: GraphQLString,
  description: 'Delete a comment',
  args: {
    id: { type: GraphQLString }
  },
  async resolve(_: any, args: any, req: any){
    const { verifiedUser } = req;
    const { id } = args;

    if (!verifiedUser) throw new Error("Unauthorized");

    const deletedComment = await Comment.findOneAndDelete(
      {
        _id: id,
        userId: verifiedUser._id,
      }
    )

    if ( !deletedComment ) throw new Error("Comment not found");

    return 'Comment deleted successfully'
  }
}
