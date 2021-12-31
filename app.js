const fs = require('fs');
const path = require('path');
const { TezosToolkit, MichelsonMap } = require('@taquito/taquito');
const { InMemorySigner, importKey } = require('@taquito/signer');

const ADDRESS = 'KT1SfDuk2NcWQ2cYa72Cw6mFSCC9azJ4DP8X';

const main = async () => {
  const faucet = fs.readFileSync(path.join('.', 'hangzhounet.json'));
  const { pkh, mnemonic, email, password, amount, activation_code } =
    JSON.parse(faucet);

  // init abstraction of Tezos
  const Tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');
  importKey(Tezos, email, password, mnemonic.join(' '), activation_code).catch(
    (e) => console.error(e),
  );

  // const jsonFile = fs.readFileSync(
  //   path.join('.', 'contract.michelson'),
  //   'utf8',
  // );
  // Tezos.contract
  //   .originate({
  //     code: jsonFile,
  //     storage: new MichelsonMap(),
  //   })
  //   .then((originationOp) => {
  //     console.log(originationOp.contractAddress);
  //     return originationOp.contract();
  //   })
  //   .then((contract) => console.log('origination'))
  //   .catch((err) => console.error(err));
};
main();
