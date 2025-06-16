import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");
    res.status(200).json({ success: true, data: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};

export const updateCart = async (req, res) => {
  const { carId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ message: "Invalid car ID" });
  }
  
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { cart: carId } },
      { new: true }
    ).populate("cart");
    res.status(200).json({ success: true, data: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating cart" });
  }
};

export const deleteCart = async (req, res) => {
  const carId  = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { cart: carId } },
      { new: true }
    ).populate("cart");
    res.status(200).json({ success: true, data: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};

export const getFav = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("fav");
    res.status(200).json({ success: true, data: user.fav });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching favorites" });
  }
};

export const updateFav = async (req, res) => {
  const { carId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return res.status(400).json({ message: "Invalid car ID" });
  }
  
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { fav: carId } },
      { new: true }
    ).populate("fav");
    res.status(200).json({ success: true, data: user.fav });
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Error updating favorites" });
  }
};

export const deleteFav = async (req, res) => {
  const carId  = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { fav: carId } },
      { new: true }
    ).populate("fav");
    res.status(200).json({ success: true, data: user.fav });
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Error removing from favorites" });
  }
};
