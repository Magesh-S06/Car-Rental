import mongoose from "mongoose";
import CarData from "../models/cardata.model.js";

export const getCarData = async (req,res)=>{
    try{
        const cardata = await CarData.find({})
        res.status(200).json({success: true, data: cardata})
    }catch(error){
        console.log("Error in fetching")
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const createCarData =  async (req,res) => {
    const Cardata = req.body

    if((!Cardata.id) || (!Cardata.make_id) || (!Cardata.name) || (!Cardata.make.id) || (!Cardata.make.name) || (!Cardata.price)|| (!Cardata.year)){
        return res.status(400).json({success: false, message: "Provide all fields"})
    }

    const newCarData = new CarData(Cardata)

    try{
        await newCarData.save()
        res.status(201).json({success: true, data: newCarData})
    } catch(error){
        console.error("Error in Create CarData",error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const updateCarData =  async (req,res)=> {
    const {id} = req.params
    const cardata = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "CarData Not Found"})
    }

    try{
        const updateCarData = await CarData.findByIdAndUpdate(id, cardata, {new: true})
        res.status(200).json({success: true, data: updateCarData})
    } catch(error){
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const deleteCarData = async(req,res) => {
    const {id} = req.params
    console.log("id:", id)
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "CarData Not Found"})
    }

    try{
        await CarData.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "CarData deleted"})
    } catch(error){
        console.error("Error in Deleting CarData",error.message)
        res.status(500).json({success: "false", message: "Server Error"})
    }
}