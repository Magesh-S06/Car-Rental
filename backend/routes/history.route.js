import express from "express";
import auth from "../middleware/auth.js";
import {
  getCart,
  updateCart,
  deleteCart,
  getFav,
  updateFav,
  deleteFav
} from "../controllers/history.controller.js";

const router = express.Router();


router.get("/cart", auth, getCart);
router.post("/cart", auth, updateCart);
router.delete("/cart/:id", auth, deleteCart);

router.get("/fav", auth, getFav);
router.post("/fav", auth, updateFav);
router.delete("/fav/:id", auth, deleteFav);

export default router;
