import express from "express";
import {getAllProperties, getPropertyById, transferProperty, approveRegistration} from "../controllers/authorityController";

const authorityRouter = express.Router();

authorityRouter.get("/", getAllProperties);
authorityRouter.get('/', getAllProperties);
authorityRouter.get('/:id', getPropertyById);
authorityRouter.post('/:id/transfer', transferProperty);
authorityRouter.post('/:id/approve', approveRegistration);

export default authorityRouter;