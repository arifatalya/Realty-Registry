import {getContract} from "../blockchainClient";
import {Request, Response} from "express";

const IDENTITY_LABEL = "appUser";

const getAllProperties = async(req: Request, res: Response) => {
    try {
        const {contract, gateway} = await getContract(IDENTITY_LABEL);
        const result = await contract.evaluateTransaction('GetAllProperties');
        gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (error: any) {
        console.log("Don't embarrass yourself like this: ", error);
        res.status(500).send({error: error.message});
    }
}

const getPropertyById = async (req: Request, res: Response) => {
    const property_id = req.params.id;
    try {
        const {contract, gateway} = await getContract(IDENTITY_LABEL);
        const result = await contract.evaluateTransaction('ReadProperty', property_id);
        gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (error: any) {
        console.log("Don't embarrass yourself like this: ", error);
        res.status(500).send({error: error.message});
    }
}

const registerProperty = async (req: Request, res: Response) => {
    const {property_id, owner, propertyType, location, size, marketValue} = req.body;
    try {
        const {contract, gateway} = await getContract(IDENTITY_LABEL);
        await contract.submitTransaction(
            'RegisterProperty',
            property_id,
            owner,
            propertyType,
            location,
            size.toString(),
            marketValue.toString(),
        );
        gateway.disconnect();

        res.json({
            message: `Property ${property_id} has been registered :3`,
        });
    } catch (error: any) {
        console.error("Don't embarrass yourself like this: ", error);
        res.status(500).send({error: error.message});
    }
}

const updateProperty = async (req: Request, res: Response) => {
    const property_id = req.params.id;
    const {propertyType, location, size, marketValue} = req.body;
    try {
        const {contract, gateway} = await getContract(IDENTITY_LABEL);
        await contract.submitTransaction(
            'UpdateProperty',
            property_id,
            propertyType,
            location,
            size.toString(),
            marketValue.toString(),
        )
        gateway.disconnect();

        res.json({
            message: `Property ${property_id} has been updated successfully :3`,
        })
    } catch (error: any) {
        console.error("Don't embarrass yourself like this: ", error);
        res.status(500).send({error: error.message});
    }
}

const deleteProperty = async (req: Request, res: Response) => {
    const property_id = req.params.id;
    try {
        const {contract, gateway} = await getContract(IDENTITY_LABEL);
        await contract.submitTransaction('DeleteProperty', property_id);
        gateway.disconnect();

        res.json({
            message: `Property ${property_id} has been deleted`,
        })
    } catch (error: any) {
        console.error("Don't embarrass yourself like this: ", error);
        res.status(500).send({error: error.message});
    }
}

const transferProperty = async (req: Request, res: Response) => {
    const property_id = req.params.id;
    const {newOwner} = req.body;
    try {
        const {contract, gateway} = await getContract(IDENTITY_LABEL);
        await contract.submitTransaction('ApproveRegistration', property_id, newOwner);
        gateway.disconnect();

        res.json({
            message: `Property ${property_id} has been transferred ${newOwner}`
        })
    } catch (error: any) {
        console.error("Don't embarrass yourself like this: ", error);
        res.status(500).send({error: error.message});
    }
}

const approveRegistration = async (req: Request, res: Response) => {
    const property_id = req.params.id;
    try {
        const {contract, gateway} = await getContract(IDENTITY_LABEL);
        await contract.submitTransaction('ApproveRegistration', property_id);
        gateway.disconnect();

        res.json({
            message: `Property ${property_id} has been approved successfully :3`,
        })
    } catch (error: any) {
        console.error("Don't embarrass yourself like this: ", error);
        res.status(500).send({error: error.message});
    }
}

export {
    getAllProperties,
    getPropertyById,
    registerProperty,
    updateProperty,
    deleteProperty,
    transferProperty,
    approveRegistration,
};