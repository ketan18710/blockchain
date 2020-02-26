const path = require('path');
const fs = require('fs');
const solc = require('solc');
const inboxPath = path.resolve(__dirname,'contracts','inbox.sol');
const source = fs.readFileSync(inboxPath,'utf8');//since we cannot directly require .sol files as it throws an error 
// console.log(solc.compile(source,1));
var input = {
    language: 'Solidity',
    sources: {
        'inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ 'abi', 'evm.bytecode' ]
            }
        }
    }
}; 
var bytecode= JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol'].Inbox.evm.bytecode.object;
var abi= JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol'].Inbox.abi;
module.exports={
    bytecode : bytecode,
    abi : abi
}
// console.log("\n")
// console.log(evm)
// console.log(bytecode)
