import express from "express";
import {getAllProperties, getPropertyById, registerProperty, updateProperty, deleteProperty, transferProperty, approveRegistration} from "../controllers/realtyController";

const realtyRouter = express.Router();

realtyRouter.get("/", getAllProperties);
realtyRouter.get('/', getAllProperties);
realtyRouter.get('/:id', getPropertyById);
realtyRouter.post('/', registerProperty);
realtyRouter.put('/:id', updateProperty);
realtyRouter.delete('/:id', deleteProperty);
realtyRouter.post('/:id/transfer', transferProperty);
realtyRouter.post('/:id/approve', approveRegistration);

export default realtyRouter;