import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { expect, jest } from "@jest/globals";
import { createPost } from "./post_service.js";
import Post from "../database/schema/post_schema.js";
import User from "../database/schema/user_schema.js";

jest.mock("../database/schema/post_schema.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("post service functions", () => {
  let saveSpy, populateSpy;

  beforeEach(() => {
    // Create a mock instance of the Post model
    const postInstance = new Post();

    // Spy on the `save` method of the mock instance
    saveSpy = jest.spyOn(postInstance, "save");
    populateSpy = jest.spyOn(Post.prototype, "populate");
  });
  afterEach(() => {
    saveSpy.mockRestore();
  });

  beforeAll(async () => {
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("create post function", () => {
    it("should create and save a new post", async () => {
      const title = "Test post";
      const body = "This is the content body";
      const user = "661279f79f11a56b4bcf6da2";
      await createPost(title, body, user);
      expect(Post).toHaveBeenCalledWith({ title, body, user });
      expect(saveSpy).toHaveBeenCalled();
      expect(populateSpy).toHaveBeenCalledWith("user", "");
    });
  });
});
