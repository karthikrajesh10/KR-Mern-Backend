import mongoose, { mongo } from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required:true,
    
  },
  password: {
    type: String,
    required:true,
    minLength: 6,
  },
  addedTours: [
    {
      type: mongoose.Types.ObjectId,
      ref:"Tour",
      
    },
  ],
});

export default mongoose.model("Admin", adminSchema);