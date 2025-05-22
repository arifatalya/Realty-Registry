import express from "express";
import {getAllProperties, getPropertyById, registerProperty, updateProperty, deleteProperty} from "../controllers/registrarController";

const registrarRouter = express.Router();

registrarRouter.get("/", getAllProperties);
registrarRouter.get('/:property_id', getPropertyById);
registrarRouter.post('/', registerProperty);
registrarRouter.put('/:property_id', updateProperty);
registrarRouter.delete('/:property_id', deleteProperty);

export default registrarRouter;