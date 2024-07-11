import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    tour: {
      type: mongoose.Types.ObjectId,
      ref:"Tour",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref:"User",
      required: true,
    },
  });
  
export default mongoose.model("Booking", bookingSchema);