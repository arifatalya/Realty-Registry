import * as fs from "fs";
import * as path from "path";
import { Gateway, Wallets, Contract } from "fabric-network";

const ccpPath = path.resolve(__dirname, '..', 'local_fabric', 'connection-org1.json');
const walletPath = path.resolve(__dirname, '..', 'local_fabric', 'wallet');
const identityLabel = 'User1@org1.example.com';

const CHANNEL_NAME = 'mychannel';
const CHAINCODE_NAME = 'propertyregistry';

async function getContract(): Promise<{ contract: Contract; gateway: Gateway }> {
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const identity = await wallet.get(identityLabel);
    if (!identity) {
        throw new Error(`${identityLabel} not found in wallet.`);
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: identityLabel,
        discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);

    return { contract, gateway };
}

export {
    getContract,
};