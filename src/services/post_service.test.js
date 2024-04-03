// import * as PostService from './post_service.js';
// import Post from '../database/schema/post_schema';


// // Mocking the Post model
// jest.mock('../database/schema/post_schema', () => ({
//   find: jest.fn().mockReturnThis(), // Mocking find() to return `this` to chain methods
//   populate: jest.fn().mockReturnThis(), // Mocking populate() to return `this` to chain methods
//   sort: jest.fn().mockReturnThis(), // Mocking sort() to return `this` to chain methods
//   skip: jest.fn().mockReturnThis(), // Mocking skip() to return `this` to chain methods
//   limit: jest.fn().mockReturnThis(), // Mocking limit() to return `this` to chain methods
// }));

// describe('PostService', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('getAllPosts', () => {
//     it('should get all posts with default parameters', async () => {
//       const mockPosts = [{ title: 'Post 1', body: 'Body 1', user: 'user1' }, { title: 'Post 2', body: 'Body 2', user: 'user2' }];
//       Post.find.mockResolvedValue(mockPosts);

//       const result = await PostService.getAllPosts({});

//       expect(Post.find).toHaveBeenCalledWith({});
//       expect(Post.find().populate).toHaveBeenCalledWith('user', '');
//       expect(Post.find().sort).toHaveBeenCalledWith(expect.any(Object)); // You can use `expect.any(Object)` here or mock `sortOptions` for precise matching
//       expect(Post.find().skip).toHaveBeenCalledWith(expect.any(Number)); // You can use `expect.any(Number)` here for precise matching
//       expect(Post.find().limit).toHaveBeenCalledWith(expect.any(Number)); // You can use `expect.any(Number)` here for precise matching
//       expect(result).toEqual(mockPosts);
//     });
//     // Add more test cases for different scenarios (e.g., with limit, page, order, orderBy).
//   });

//   // Add tests for other functions as needed
// });
