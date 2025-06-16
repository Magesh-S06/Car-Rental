import mongoose from "mongoose";

const cardataSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    make_id:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    make: {
      id:{
        type: Number,
        required: true
      },
      name:{
        type: String,
        required: true
      }
    },
    price:{
        type: Number,
        required: true
    },
    year:{
      type: Number,
      required: true
  }
})

const CarData = mongoose.model('CarData', cardataSchema)

export default CarData