const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js')


const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

console.log(publicKey);
console.log(secretKey);

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`wallet balance`, walletBalance)
    } catch (error) {

    }
}

const airDropSol = async () => {
    try {
        let connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        let airdropSignature = await connection.requestAirdrop(
            publicKey,
            LAMPORTS_PER_SOL,
        );

        await connection.confirmTransaction(airdropSignature);
    } catch (err) {
        console.log(err);
    }
}
const main = async () => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()

}

main()