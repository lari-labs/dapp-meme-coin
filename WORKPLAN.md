---
runme:
  id: 01HN3E2DP3C632TNKSYX0076ZP
  version: v2.2
---

## Todo

- [] Contract meta object
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


## Discussions
- Upgrade
    - Burn mechanism will unlock...?
    - Incentivizing fast claim with more tokens -> what does more tokens get users? Idea: Levels given out according to burn supply. Gain access to...
        - Early access to dapps.
- Futarchy
    - What are we thinking about this.

```javascript
// facet composition

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

// {ReturnType<Payment>} Payment 
const createPayment = timestamp => lookupTokenAllocation(timestamp)

```