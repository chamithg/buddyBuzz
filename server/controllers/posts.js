import Post from "../models/Post.js";
import User from "../models/User.js";

/* Create */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user,
      Location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comment: [],
    });
    await newPost.save();

    // once added a new post, we need to return all posts to the front end
    // so the front end will have the updated list of posts.
    const post = await post.find();
    res.status(201).json(post); /// 201 --> created something
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* READ */

export const getFeedPosts = async (req, res) => {
  try {
    const post = await post.find();
    res.status(200).json(post); // 200--> successfully returned something.
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* Update */
