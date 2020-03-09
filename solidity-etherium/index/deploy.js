const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const {abi , bytecode} = require('./compile');
const provider = new HDWalletProvider(
    'december blossom school two brief lunar siren truth purse violin car submit',
    'https://rinkeby.infura.io/v3/737d5964ada94e2a8d812f1414c89c4e'
)
const web3 = new Web3(provider)
async function scan(message) {
    process.stdout.write(message);
    return await new Promise(function(resolve, reject) {
        process.stdin.resume();
        process.stdin.once("data", function(data) {
            process.stdin.pause();
            resolve(data.toString().trim());
        });
    });
}

async function getGasPrice(web3) {
    while (true) {
        const nodeGasPrice = await web3.eth.getGasPrice();
        const userGasPrice = await scan(`Enter gas-price or leave empty to use ${nodeGasPrice}: `);
        if (/^\d+$/.test(userGasPrice))
            return userGasPrice;
        if (userGasPrice == "")
            return nodeGasPrice;
        console.log("Illegal gas-price");
    }
}

const deploy = async() =>{
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account',accounts[0])
    const result = await new web3.eth.Contract(abi)
        .deploy({data:'0x' +bytecode ,arguments: ['hii']})
        .send({from: accounts[0],gas: 1500000,gasPrice: await getGasPrice(web3)})
    console.log('contract deployed to', result.options.address);
}
deploy()