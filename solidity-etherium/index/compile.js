const path = require('path');
const fs = require('fs');
const solc = require('solc');
const inboxPath = path.resolve(__dirname,'contracts','inbox.sol');
const source = fs.readFileSync(inboxPath,'utf8');//since we cannot directly require .sol files as it throws an error 
// console.log(solc.compile(source,1));
var input = {
    language: 'Solidity',
    sources: {
        'hello.sol' : {
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
console.log(JSON.parse(solc.compile(JSON.stringify(input))));
