import express from 'express';
import auth from '../middleware/auth.js';
import { getOrder, createOrder, deleteOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.post("/", auth, createOrder)
router.get("/", auth, getOrder)
router.delete("/:id", auth, deleteOrder);

export default router