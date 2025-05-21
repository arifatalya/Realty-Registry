// import * as fs from "fs";
// import * as path from "path";
// import { Wallets, X509Identity } from "fabric-network";
//
// async function importIdentity() {
//     const walletPath = path.join(__dirname, '..', 'local_fabric', 'wallet');
//     const wallet = await Wallets.newFileSystemWallet(walletPath);
//
//     const identityLabel = 'Admin@org1.example.com';
//     const mspId = 'Org1MSP';
//
//     const certPath = path.resolve(
//         walletPath,
//         identityLabel,
//         'cert.pem'
//     );
//
//     const keyFiles = fs.readdirSync(path.join(walletPath, identityLabel));
//     const keyFile = keyFiles.find((f) => f !== 'cert.pem');
//
//     if (!keyFile) {
//         throw new Error('No private key file found!');
//     }
//
//     const keyPath = path.join(walletPath, identityLabel, keyFile);
//
//     const cert = fs.readFileSync(certPath).toString();
//     const key = fs.readFileSync(keyPath).toString();
//
//     const identity: X509Identity = {
//         credentials: {
//             certificate: cert,
//             privateKey: key,
//         },
//         mspId: mspId,
//         type: 'X.509',
//     };
//
//     await wallet.put(identityLabel, identity);
//     console.log(`Successfully imported ${identityLabel} into the wallet. Please check the directory.`);
// }
//
// importIdentity();