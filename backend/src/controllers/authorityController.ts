import {getContract} from "../blockchainClientOrg2";
import {Request, Response} from "express";

const getAllProperties = async(req: Request, res: Response) => {
    try {
        const {contract, gateway} = await getContract();
        const result = await contract.evaluateTransaction('GetAllProperties');
        gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (error: any) {
        console.log("Error occurred: ", error);
        res.status(500).send({error: error.message});
    }
}

const getPropertyById = async (req: Request, res: Response) => {
    const property_id = req.params.id;
    try {
        const {contract, gateway} = await getContract();
        const result = await contract.evaluateTransaction('ReadProperty', property_id);
        gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (error: any) {
        console.log("Error occurred: ", error);
        res.status(500).send({error: error.message});
    }
}

const transferProperty = async (req: Request, res: Response) => {
    const property_id = req.params.id;
    const {newOwner} = req.body;
    try {
        const {contract, gateway} = await getContract();
        await contract.submitTransaction('ApproveRegistration', property_id, newOwner);
        gateway.disconnect();

        res.json({
            message: `Property ${property_id} has been transferred ${newOwner}`
        })
    } catch (error: any) {
        console.error("Error occurred: ", error);
        res.status(500).send({error: error.message});
    }
}

const approveRegistration = async (req: Request, res: Response) => {
    const property_id = req.params.id;
    try {
        const {contract, gateway} = await getContract();
        await contract.submitTransaction('ApproveRegistration', property_id);
        gateway.disconnect();

        res.json({
            message: `Property ${property_id} has been approved successfully :3`,
        })
    } catch (error: any) {
        console.error("Error occurred: ", error);
        res.status(500).send({error: error.message});
    }
}

export {
    getAllProperties,
    getPropertyById,
    transferProperty,
    approveRegistration,
};