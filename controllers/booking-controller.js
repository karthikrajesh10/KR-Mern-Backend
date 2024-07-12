import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Tour from "../models/Tour.js";
import User from "../models/User.js";

export const newBooking = async (req, res, next) => {
    const { tour, date, members, user } = req.body;
    let existingTour;
    let existingUser;
    try{

        existingTour = await Tour.findById(tour)
        existingUser = await User.findById(user)

    }catch(err){
        return console.log(err);

    }
    if(!existingTour){
        return res.status(404).json({ message: "Tour Not Found With Given ID" });
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User not found with given ID " });
      }



    let booking;
    try{
        booking = new Bookings({tour,date:new Date(`${date}`),members,user})
        const session =  await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingTour.bookings.push(booking);
        await existingUser.save({session});
        await existingTour.save({session});
        await booking.save({session});
        session.commitTransaction();




        

    }catch(err){
        return console.log(err)
    }
    if(!booking){
        return res.status(500).json({message:"Unable to create a booking"})
    }
    return res.status(201).json({booking})
}

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
      booking = await Bookings.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!booking) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ booking });
  };

  export const deleteBooking=async(req,res,next)=>{
    const id = req.params.id
    let booking;
    try{
        booking=await Bookings.findByIdAndDelete(id).populate("user tour")
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.tour.bookings.pull(booking);
        await booking.tour.save({session});
        await booking.user.save({session});
        session.commitTransaction();

    }catch(err){
        return console.log(err);

    }
    if (!booking) {
        return res.status(500).json({ message: "Unable to Delete" });
      }
      return res.status(200).json({ message: "Successfully Deleted" });
  }