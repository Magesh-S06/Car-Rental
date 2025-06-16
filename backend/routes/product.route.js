import express from "express";
import { createCarData, deleteCarData, getCarData, updateCarData } from "../controllers/product.controller.js";

const router = express.Router()

router.get("/", getCarData)
router.post("/", createCarData)
router.put("/:id", updateCarData)
router.delete("/:id", deleteCarData)

export default router