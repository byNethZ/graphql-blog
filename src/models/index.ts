import { Schema, model } from "mongoose";
import IComment from "./Comment.interface";
import IPost from "./Post.interface";
import IUser from "./User.interface";

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Provide a valid email address",
      ],
    },
    displayName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const postSchema = new Schema<IPost>(
  {
    authorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const commentSchema = new Schema<IComment>(
  {
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = model<IPost>("Post", postSchema);
export const User = model<IUser>("User", userSchema);
export const Comment = model<IComment>("Comment", commentSchema);
