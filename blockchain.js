const sha256 = require('sha256');
const Block = require('./block');

class BlockChain {
	constructor() {
		this.chain = [];
		this.currentTransactions = [];
		this.newBlock(100, 1);
	}
	hash(block) {
		//sort property names alphabetically to ensure consistent hashes
		let tempSorted = Object
			.keys(block)
			.sort((a, b) => block[a] - block[b])
			.reduce((_sortedObj, key) => ({
				..._sortedObj,
				[key]: block[key]
			}), {});
		//sha 256 hex hash of new sorted block
		return sha256(tempSorted);
	}
	validProof(lastProof, proof) {
		let hash = sha256((lastProof + proof).toString());
		console.log(lastProof + proof, (lastProof + proof).toString(), hash.substring(0, 2));
		return hash.substring(0, 2) == '00';
	}
	proofOfWork(lastProof) {
		let proof = 0;
		while (!this.validProof(lastProof, proof)) {
			proof += 1;
		}
		return proof;
	}
	newBlock(proof, previousHash) {
		let block = new Block({
			index: (this.chain.length + 1),
			timestamp: new Date(),
			transactions: this.currentTransactions,
			proof: proof,
			previousHash: previousHash || this.hash(this.chain[this.chain.length - 1])
		});
		this.currentTransactions = [];
		this.chain.push(block);
		return block;
	}
	newTransaction(sender, recipient, amount) {
		this.currentTransactions.push({
			sender,
			recipient,
			amount
		});
		return this.lastBlock().index + 1;
	}
	lastBlock() {
		return this.chain[this.chain.length - 1];
	}
}
module.exports = BlockChain;