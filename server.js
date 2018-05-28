const express = require("express");
const app = express();
const uuidv4 = require("uuid/v4");
const BlockChain = require("./blockchain");
const PORT = process.env.PORT || 9000;
let blockChain = new BlockChain();
let nodeIdentifier = uuidv4();
//console.log(blockChain)

app.get("/mine", (req, res) => {
  let lastBlock = blockChain.lastBlock();
  let lastProof = lastBlock.proof;
  let proof = blockChain.proofOfWork(lastProof);

  blockChain.newTransaction(0, nodeIdentifier, 1);

  let previousHash = blockChain.hash(lastBlock);
  let block = blockChain.newBlock(proof, previousHash);
  res.send({
    message: "New Block Forged",
    index: block.index,
    transactions: block.transactions,
    proof: block.proof,
    previousHash: block.previousHash
  });
});

app.get("/chain", (req, res) => {
  res.send({ chain: blockChain.chain, length: blockChain.chain.length });
});

app.post("/transactions/new", (req, res) => {
  let transaction = req.body;
  let index = blockChain.newTransaction(transaction);
  res.send({ message: `Transaction will be added to Block: ${index}` });
});

app.listen(PORT, () =>
  console.log(`App listening on http://localhost:${PORT}`)
);
