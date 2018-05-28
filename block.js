class Block {
	constructor({
		index,
		timestamp,
		transactions,
		proof,
		previousHash
	}) {
		if (!index || !timestamp || !transactions || !proof || !previousHash)
			throw new Error('Failed to provide all data');
		else {
			this.index = index;
			this.timestamp = timestamp;
			this.transactions = transactions || [];
			this.proof = proof;
			this.previousHash = previousHash;
		}
	}
}
module.exports = Block;