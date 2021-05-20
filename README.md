# Canvas UI v2

This is just a very simple App, ver far from being complete. The intention was to

(1) Connect to  a local Canvas Node
(2) Upload a contract bundle file which is persisted in the global store
(3) Instiate a version of this uploaded file on our local Canvas Node
(4) Expose the methods of the Smart Contract, so that the user can call them it see the results.

It dowsn't manage the access to eyrings and accounts for now, instead it is using the Alice account for all Interactions by now. But this could bechanged easily.

The interaction with the app is done by actions and selectors. The purpose of selectors is to query some data from the app, the purpose of actions is to trigger actions so that both concepts are strictly seperated in concers.

To access any data from the store, you need to import it by importing the `useSelectors` hook together with the `selectors` object. E.g. to obtain the array of all uploaded contracts, you assign them by 

``
import {selectors, useSelectors} from '../../redux'
...
const contracts=useSelector(selectors.file.contracts.allContracs)``

The way to upload any data is by accessing the action with the `useActions` hook. The  creators are already wrapped with redux's dispatch funciton, so the will be dispatched as soon as they are calles. This means to upload a new contract file which is then available for instantiaion and to be queried as descried above, you do:

```
import {useActions} from '../../redux'
...
const file=... //some file to upload
actions.file.upload(file)
```

These are all the actions which can be accessed by Frontend components and are initiated by `actions = useActions()`:


### File Actions:
* `actions.file.save(file: File)`
* `actions.file.notifySaved(name: string, methods: Array<string>, hash: string, json: string)` 
* `actions.file.forget(hash: string)`
### API Actions:
* `actions.api.connect(url: string)`
* `actions.api.connected()`
* `actions.api.disconnect()`
* `actions.api.disconnected()`
### Instance Actions:  
* `actions.instance.startInstantiation()` 
  - if you start the instantiation with a wizard, then this action resets all the Insantiation related data in the store.
* `actions.instance.instantiate(hash: string, gas: string, endowment: string)` 
  - this instantiates a contract on the chain whos file has been uploaded before. You just nned to provide the contracts hash to identify it, the gas and the endowment. Currently all contracts are signed on the local chain, using the Alice account. So this should carry an additional AccountId in future implementations.
* `actions.instance.instantiationRespnse(status: ContractStatus, message: UIMessage, address: string)` 
  - This action is dispatched by the middleware to inform about the instantiation progress of the contract on chain. 
* `actions.instance.cancelInstantiation()`
  - If this action is dipatched, the Middlewqare will cancel a running instantiation.
* `actions.instance.call(address: string, method: string, gas?: string)` 
  - Will sign and submit a action on a smart contract which is deployed on the chain. Needs the contracts address and the method to call, the amount of gas which should be used is optional, defaults to 800000000.
* `actions.instance.callRpc(address: string, method: string, gas ?:string)` 
  - Will do an RPC call on a smart contract which is deployed on the chain. Needs the contracts address and the method to call, the amount of gas which should be used is optional, defaults to 800000000.
* `actions.instance.cancelCall()` 
  - Cancels the processing of a running call of a Smart contract in the middleware.
* `actions.instance.callResponse(message: UIMessage)` 
  - The middleware will process the calls and rpcCalls. As soon as there are some answers from the Canvas Node regarding the calls ('onChain', 'Finalized', 'outOfGas'...), this action will be dispatched by the middleware which is executing the call.
* `actions.instance.clearResult()` 
  -  This will clear all the received callResults in the Redux store.
* `actions.instance.forget(address: string)` 
  - Forget about an instance / remove the instance details from the store.


  
  
