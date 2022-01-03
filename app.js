const fs = require('fs');
const path = require('path');
const {
  TezosToolkit,
  MichelsonMap,
  ContractAbstraction,
} = require('@taquito/taquito');
const { InMemorySigner, importKey } = require('@taquito/signer');

const ADDRESS = 'KT1LorGyjkKtXm35LNYHjyAefRXfbXP7LgcU';

function createTezosToolkit() {
  // read faucet file - testnet account information
  const faucet = fs.readFileSync(path.join('.', 'hangzhounet.json'));
  const { pkh, mnemonic, email, password, amount, activation_code } =
    JSON.parse(faucet);

  // TezosToolkit
  const Tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');
  importKey(Tezos, email, password, mnemonic.join(' '), activation_code).catch(
    (e) => console.error(e),
  );
  return Tezos;
}

async function originate() {
  const Tezos = createTezosToolkit();

  // read smart contract written michelson
  const jsonFile = fs.readFileSync(
    path.join('.', 'contract.michelson'),
    'utf8',
  );

  // originate (deploy) contract
  Tezos.contract
    .originate({
      code: jsonFile,
      storage: new MichelsonMap(),
    })
    .then((originationOp) => {
      console.log(originationOp.contractAddress);
      return originationOp.contract();
    })
    .then((contract) => console.log('origination'))
    .catch((err) => console.error(err));
}

async function record(key, value) {
  const Tezos = createTezosToolkit();
  Tezos.contract
    .at(ADDRESS)
    .then((contract) => {
      return contract.methods.record(value, key).send();
    })
    .then((op) => op.confirmation(1).then(() => op.hash))
    .then((hash) =>
      console.log(`Operation injected: https://hangzhounet.api.tez.ie/${hash}`),
    )
    .catch((err) => console.log(err));
}

originate();
