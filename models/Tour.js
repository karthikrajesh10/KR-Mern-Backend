import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      attractions:[{type:String,required:true,}],
      bookingDate: {
        type: Date,
        required: true,
      },
      picsUrl: {
        type: String,
        required: true,
      },
      featured: {
        type: Boolean,
      },
      bookings: [{ type: mongoose.Types.ObjectId,ref:"Booking" }],
      admin: {
        type: mongoose.Types.ObjectId,
        ref:"Admin",
        required: true,
      },
})

export default mongoose.model("Tour",tourSchema)