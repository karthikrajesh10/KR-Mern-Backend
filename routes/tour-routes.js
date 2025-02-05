import express from 'express'
import { addTour, getAllTours, getTourById } from '../controllers/tour-controller.js';

const tourRouter=express.Router();

tourRouter.get("/",getAllTours)
tourRouter.get("/:id",getTourById)
tourRouter.post("/",addTour)

export default tourRouter;