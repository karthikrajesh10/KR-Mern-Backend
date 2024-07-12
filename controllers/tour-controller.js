import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Tour from '../models/Tour.js';
import Admin from '../models/Admin.js';


export const addTour = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(404).json({ message: "Token Not Found" });
    }

    const extractedToken = authHeader.split(" ")[1]; // Extract the token after "Bearer"

    if (!extractedToken || extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token Not Found" });
    }

    let adminId;

    // Verify token 
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        } else {
            adminId = decrypted.id;
        }
    });

    // Create new tour
    const { place, description, bookingDate, picsUrl, featured, attractions } = req.body;
    if (!place || place.trim() === "" || !description || description.trim() === "" || !picsUrl || picsUrl.trim() === "") {
        return res.status(422).json({ message: "Invalid inputs" });
    }

    let tour;
    try {
        tour = new Tour({
            description,
            bookingDate: new Date(`${bookingDate}`),
            featured,
            attractions,
            admin: adminId,
            picsUrl,
            place
        });
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId)
        session.startTransaction();

        await tour.save({session});
        adminUser.addedTours.push(tour);
        await adminUser.save({session});
        await session.commitTransaction();
      
    } catch (err) {
        return console.log(err);
    }

    if (!tour) {
        return res.status(500).json({ message: "Request Failed" });
    }

    return res.status(201).json({ tour });
};

export const getAllTours= async(req,res,next)=>{
    let tours;
    try{
        tours=await Tour.find();

    }catch(err){

    }
    if(!tours){
        return res.status(500).json({message:"Request Failed"})
    }
    return res.status(200).json({tours})

}

export const getTourById = async(req,res,next)=>{
    const id = req.params.id
    let tour;
    try{
        tour= await Tour.findById(id)

    }catch(err){
        return console.log(err)

    }
    if(!tour){
        return res.status(404).json({message:"Invalid Movie ID"})
    }
    return res.status(200).json({tour})
}