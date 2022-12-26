import express from "express";
import { verify } from "jsonwebtoken";
import { getFeedPosts, getUserPosts, likePosts } from "../controllers/posts";
import { veifyToken } from "../middleware/auth";

const router = express.Router();
/*read */
router.get("/", veifyToken, getFeedPosts);
router.get("/:userId/posts", veifyToken, getUserPosts);

/*update */
router.patch("/:id/like", verifyToken, likePosts);

export default router;
