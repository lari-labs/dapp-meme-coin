### Merkle Airdrop

## Claim Process

- calls this.facets.helper.verify(proof)
  - after proof has been verified it adds the address to the claimed store.
- ~~eligibleUserStore~~ claimedUserStore
  - user is added add key when claim happens.
- Send the coins to the address associated with user-provided inclusion proof.
- Add merkle root to state.
