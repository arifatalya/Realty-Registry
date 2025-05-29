import express from "express";
import {getAllProperties, getPropertyById, transferProperty, approveRegistration} from "../controllers/authorityController";

const authorityRouter = express.Router();

authorityRouter.get("/", getAllProperties);
authorityRouter.put('/:property_id/transfer', transferProperty);
authorityRouter.post('/:property_id/approve', approveRegistration);
authorityRouter.get('/:property_id', getPropertyById);

export default authorityRouter;