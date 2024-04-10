import {
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  createPost,
} from "./post_service.js";
import Post from "../database/schema/post_schema.js";
// import { jest } from "@jest/globals";

jest.mock("../database/schema/post_schema.js", () => {
  // Mock for the instance methods
  const mockInstance = {
    save: jest.fn().mockResolvedValue({
      title: "Test Title",
      body: "Test Body",
      user: "Test User",
    }),
    populate: jest.fn().mockReturnThis(), // For chaining
  };

  return {
    // __esModule: true, // Mark it as an ES module
    default: jest.fn().mockImplementation(() => mockInstance),
    // Static method mocks
    find: jest.fn().mockResolvedValue([]),
    findById: jest.fn().mockResolvedValue(null),
    findByIdAndUpdate: jest.fn().mockResolvedValue(null),
    findByIdAndDelete: jest.fn().mockResolvedValue(null),
  };
});
describe("Post Controller", () => {
  beforeEach(() => {
    Post.find.mockClear();
    Post.findById.mockClear();
    Post.findByIdAndUpdate.mockClear();
    Post.findByIdAndDelete.mockClear();
  });
  it("getAllPosts retrieves posts successfully", async () => {
    Post.find.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(["post1", "post2"]),
          }),
        }),
      }),
    });
    const posts = await getAllPosts({
      limit: 10,
      page: 1,
      order: "desc",
      orderBy: "createdAt",
    });
    expect(posts.length).toBe(2);
    expect(Post.find).toHaveBeenCalled();
  });
  it("getSinglePost retrieves a post successfully", async () => {
    Post.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue("singlePost"),
    });
    const post = await getSinglePost("someId");
    expect(post).toBe("singlePost");
    expect(Post.findById).toHaveBeenCalled();
  });
  it("updatePost updates a post successfully", async () => {
    Post.findByIdAndUpdate.mockReturnValue({
      populate: jest.fn().mockResolvedValue("updatedPost"),
    });
    const post = await updatePost("someId", { title: "New Title" });
    expect(post).toBe("updatedPost");
    expect(Post.findByIdAndUpdate).toHaveBeenCalled();
  });
  it("deletePost deletes a post successfully", async () => {
    Post.findByIdAndDelete.mockReturnValue({
      populate: jest.fn().mockResolvedValue("deletedPost"),
    });
    const post = await deletePost("someId");
    expect(post).toBe("deletedPost");
    expect(Post.findByIdAndDelete).toHaveBeenCalled();
  });
  it("createPost creates a post successfully", async () => {
    post.save = jest.fn().mockResolvedValue("newPost");
    Post.populate = jest.fn().mockReturnValue("populatedPost");
    const post = await createPost("Test Title", "Test Body", "Test User");
    expect(post).toBe("newPost");
    expect(Post.prototype.save).toHaveBeenCalled();
  });
});
