import express from "express";
import User from "../controllers/Users.js";
import Post from "../controllers/Posts.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// [-- AUTH --] 
router.get("/users", verifyToken, User.getUsers);
router.post("/register", User.Register);
router.post("/login", User.Login);
router.get("/token", refreshToken);
router.delete("/logout", User.Logout);

// [-- POSTS --] 
router.route('/posts')
  .get(verifyToken, Post.getPosts)
  .post(verifyToken, Post.insertPost)

router.route('/posts/:id')
  .get(verifyToken, Post.findPost)
  .put(verifyToken, Post.updatePost)
  .delete(verifyToken, Post.deletePost)

export default router;
