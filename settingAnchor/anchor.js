const anchor = require('@project-serum/anchor');
const { Connection, Keypair } = require('@solana/web3.js');
const { Program, Provider } = anchor;

const fs = require('fs');
// Load the wallet keypair from a JSON file
const keypairPath = '/home/juboi/Downloads/id.json'; // Replace with your wallet file path
const secretKey = JSON.parse(fs.readFileSync(keypairPath, 'utf8'));
const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));

// Create an Anchor wallet instance
const wallet = new anchor.Wallet(walletKeypair);
 // Assumes you have a local Solana wallet set up

// Connect to the Solana cluster
const connection = new Connection("https://api.devnet.solana.com", "confirmed"); // Use mainnet for production

// Define your provider
const provider = new anchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  

// Load the IDL file
const idl = require('/home/juboi/Downloads/idl.json'); // Replace with the actual path to the IDL file

// Define your program ID
const programId = new anchor.web3.PublicKey("DePbUSEcQvzqyD8r7NC54bM49ph7ez9UC3KPJXsJgscQ"); // Replace with your program's public key

// Initialize the program (pg)
const pg = new Program(idl, programId, provider);
console.log("pg is ",pg)
