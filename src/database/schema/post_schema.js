import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User f"    
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

postSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    return {
      id: ret.id,
      ...ret,
    };
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
