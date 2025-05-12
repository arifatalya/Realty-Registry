import express from "express";
import {getAllProperties, getPropertyById, registerProperty, updateProperty, deleteProperty} from "../controllers/registrarController";

const registrarRouter = express.Router();

registrarRouter.get("/", getAllProperties);
registrarRouter.get('/:id', getPropertyById);
registrarRouter.post('/', registerProperty);
registrarRouter.put('/:id', updateProperty);
registrarRouter.delete('/:id', deleteProperty);

export default registrarRouter;