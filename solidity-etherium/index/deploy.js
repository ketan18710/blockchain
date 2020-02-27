const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {abi , bytecode} = require('./compile');
const provider = new HDWalletProvider(
    'december blossom school two brief lunar siren truth purse violin car submit',
    'https://rinkeby.infura.io/v3/737d5964ada94e2a8d812f1414c89c4e'
)
const web3 = new Web3(provider)
const deploy = async() =>{
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account',accounts[0])
    const result = await new web3.eth.Contract(abi)
    .deploy({data: bytecode , arguments: ['Hii there']})
    .send({gas: '10000000', from: accounts[0]})
    console.log('contract deployed to', result.options.address);
}
deploy()