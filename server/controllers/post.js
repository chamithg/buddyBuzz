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
    res.status(409).json({ message: error.message }); /// 409 --> error in creating something
  }
};

/* READ */

export const getFeedPosts = async (req, res) => {
  try {
    const post = await post.find();
    res.status(200).json(post); // 200--> successfully returned something.
  } catch (error) {
    res.status(404).json({ message: error.message }); //  404 --> error in getting something
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message }); //  404 --> error in getting something
  }
};

/* Update */

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);

    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId, true);
    } else {
      post.likes.set(userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
