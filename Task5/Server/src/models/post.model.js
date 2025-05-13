import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
    },
    media: {
      type: Object,
      required: [true, "Media is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Author is required"],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.statics.getAuthorPosts = async function (authorId) {
  if (!authorId) {
    throw new Error("Author is required");
  }

  const posts = await this.find({
    author: authorId,
  });

  return posts;
};

postSchema.methods.updateCaption = async function (caption) {
  this.caption = caption;
  await this.save();

  return this;
};

postSchema.statics.getRecentPosts = async function (limit, skip = 0) {
  if (!limit) {
    throw new Error("Limit is required");
  }

  const posts = await this.find()
    .sort({ createdAt: -1 })
    .limit(limit > 10 ? 10 : limit)
    .skip(skip)
    .populate("author");

  return posts;
};

postSchema.statics.isValidPostId = async function (postId) {
  if (!postId) {
    throw new Error("Post is required");
  }

  const isValidPostId = mongoose.Types.ObjectId.isValid(postId);

  return isValidPostId;
};

postSchema.methods.incrementLikeCount = async function () {
  this.likesCount += 1;
  await this.save();
  return this;
};

postSchema.methods.decrementLikeCount = async function () {
  this.likesCount -= 1;
  await this.save();
  return this;
};

postSchema.methods.incrementCommentCount = async function () {
  this.commentsCount += 1;
  await this.save();
  return this;
};

postSchema.methods.decrementCommentCount = async function () {
  this.commentsCount -= 1;
  await this.save();
  return this;
};

const postModel = mongoose.model("post", postSchema);

export default postModel;
