---
runme:
  id: 01HN1XGR89YBMC6R5CZSSYZS1K
  version: v2.2
---

### Merkle Airdrop

## Claim Process

- calls this.facets.helper.verify(proof)
   - after proof has been verified it adds the address to the claimed store.

- ~~eligibleUserStore~~ claimedUserStore
   - user is added add key when claim happens.

- Send the coins to the address associated with user-provided inclusion proof.
- Add merkle root to state.


## State 

``````

```javascript {"id":"01HN1XHDQ07P2SXSRVT2RRVTPT"}
const facets = {};

const simpleMerge = initial => terminal => ({...initial, ...terminal});

const tokenHolderFacet = (initial = {}) => {
    let state = initial;
    let updateState = simpleMerge(state);

    return {
        state,
        updateState(newState) {
            state = updateState(newState)
        },
        getState() {
            console.log(this)
            return state
        }
    }
}

const l = tokenHolderFacet({name: 'toms token'});

console.log('tokenHolder powers:::', l, )
```

```javascript {"id":"01HN254JA4CBWZQTK0HC5FBVYP"}
// {ReturnType<Payment>} Payment 
const createPayment = timestamp => lookupTokenAllocation(timestamp)

```

## Todo

- [] Postal Service
- [] Investigate / Wire up launchIt contract.
- [] Database for prools
- [] VStorage (?)
    - issuer
    - startTime ~~(May not be needed due to launchIt deployment)~~
- [] TimerService Operations
    - setWakeup(startTime, stateUpdate(s => ({...s, isActive: !isActive })))
- [] Claim
    - Inclusion Proof Logic
    - timerService.getCurrentTimestamp(ts => timeSinceActivation(ts)).then(res => createPayment(res))
    - Postal Service Send
    - 

## Discussions
- Upgrade
    - Burn mechanism will unlock...?
    - Incentivizing fast claim with more tokens -> what does more tokens get users? Idea: Levels given out according to burn supply. Gain access to...
        - Early access to dapps.
- Futarchy
    - What are we thinking about this.
- LARI Design
    -
    

```javascript {"id":"01HN24R7DHWPF0MSRZCCFCT4QD"}

```

```javascript {"id":"01HN1YRAFK7HMAASJ4JT9A2P2A"}
 
```
