import Post from "../database/schema/post_schema.js";

export const getAllPosts = async ({
  limit = 10,
  page = 1,
  order = "desc",
  orderBy = "createdAt",
}) => {
  const skip = (page - 1) * limit;
  const sortOptions = { [orderBy]: order };

  const posts = await Post.find({})
    .populate("user", "")
    .sort(sortOptions)
    .skip(skip)
    .limit(parseInt(limit));

  return posts;
};

export const getSinglePost = async (id) => {
  console.log(typeof id);
  const post = await Post.findById(id).populate("user", "");
  console.log(post);
  return post;
};

export const updatePost = async (id, updateField) => {
  const post = await Post.findByIdAndUpdate(id, updateField).populate(
    "user",
    "",
  );
  console.log(post);
  return post;
};

export const deletePost = async (id) => {
  console.log(typeof id);
  const post = await Post.findByIdAndDelete(id).populate("user", "");
  console.log(post);
  return post;
};

export const createPost = async (title, body, user) => {
  const newPost = new Post({
    title,
    body,
    user,
  });
  await newPost.save();
  console.log(newPost);
  return newPost;
};
