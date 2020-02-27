const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {abi , bytecode} = require('../compile');
let accounts;
beforeEach(async ()=>{
    // get a list of all unlocked accounts
    //ganache automatically created them and are ree to send and get ether from
    //all web3 functions are asdync and return a primise
    accounts = await web3.eth.getAccounts();
    //use one of the accounts to deploy contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({data:'0x' +bytecode ,arguments: ['hii']})
        .send({from: accounts[0],gas: '1000000'})
    })
describe('Inbox',()=>{
    it('deploys a contract',()=>{
        assert.ok(inbox.options.address);//assert.ok checks if the value is a real value
    });
    it('has a default message',async ()=>{
        var msg = await inbox.methods.message().call();
        assert.equal(msg,'hii');
    })
})