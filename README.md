# Canvas UI v2

## Introduction

This is just a very simple App, far from being complete. The intention is to:

1. Connect to  a local Canvas Node
2. Upload a contract bundle file which is persisted in the global store
3. Instiate a version of this uploaded file on our local Canvas Node
4. Expose the methods of the Smart Contract, so that the user can call them and see the results.

It doesn't manage the access to keyrings and accounts for now, instead it is using the Alice account for all Interactions by now. But this can be changed easily.

The interaction with the app is done by actions and selectors. The purpose of selectors is to query some data from the app's store, the purpose of actions is to trigger actions so that both concepts are strictly seperated in concers, which makes the API [CQRS](https://martinfowler.com/bliki/CQRS.html).

To access any data from the store, you need to import it by importing the `useSelectors` hook together with the `selectors` object. E.g. to obtain the array of all uploaded contracts, you have to write:

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
## Interacting with the API:

In this chapter I describe methods needed by Frontend compnents to interact with the API. Everything else is abstracted away from the Fronmtend components and is handled in the Redux internals.

### Actions

These are all the action creators which can be accessed by Frontend components and are accesseed by initiating `actions = useActions()`, the only neccessary thing for calling them is to call the action as listed below, together with the required parameters:

#### File Actions:
* `actions.file.save(file: File)` 
* `actions.file.forget(hash: string)`
#### API Actions:
* `actions.api.connect(url: string)`
* `actions.api.disconnect()`
#### Instance Actions:  
* `actions.instance.startInstantiation()` 
  - if you start the instantiation with a wizard, then this action resets all the Insantiation related data in the store.
* `actions.instance.instantiate(hash: string, gas: string, endowment: string)` 
  - this instantiates a contract on the chain whos file has been uploaded before. You just nned to provide the contracts hash to identify it, the gas and the endowment. Currently all contracts are signed on the local chain, using the Alice account. So this should carry an additional AccountId in future implementations.
* `actions.instance.cancelInstantiation()`
  - If this action is dipatched, the Middlewqare will cancel a running instantiation.
* `actions.instance.call(address: string, method: string, gas?: string)` 
  - Will sign and submit a action on a smart contract which is deployed on the chain. Needs the contracts address and the method to call, the amount of gas which should be used is optional, defaults to 800000000.
* `actions.instance.callRpc(address: string, method: string, gas ?:string)` 
  - Will do an RPC call on a smart contract which is deployed on the chain. Needs the contracts address and the method to call, the amount of gas which should be used is optional, defaults to 800000000.
* `actions.instance.cancelCall()` 
  - Cancels the processing of a running call of a Smart contract in the middleware.
* `actions.instance.clearResult()` 
  -  This will clear all the received callResults in the Redux store.
* `actions.instance.forget(address: string)` 
  - Forget about an instance / remove the instance details from the store.


### Queries


## How the interaction works with Redux and Rxjs:

Every time a user is calling an action creator like `actions.api.connect('ws://127.0.0.1')`, an action will be disaptched. Or to be precise, this function call will dispatch the object 
```
{type: '@api/connect', payload: {url: 'ws://127.0.0.1'}} 
```
This action will be treated in two different domains:

1. Within the redux reducer. The reducers task is updating the redux store with respect to the submitted action. Here for you api.connect action, you will find a case which handles it:
   ```
   .addCase(actions.api.connect, (state, action) => {
      state.connectStatus = 'Connecting';
      state.connectUrl = action.payload.url;
    })
    ```
    So, what it does is updating the redux store `connectStatus` value to `Connecting`.
2. After reaching the store, it will bre processed by all the epics of the middleware. The Epics are observables listening to the dispatched actions and responding to them. you can see all epics in the folder `/modules/redux/epics` and this is all the business logic which treats the interactions with Polkadot API.
In case of actions.api.connect, the following epic will run:
```
const connect: Epic<Action<any>, Action<any>, RootState, Dependencies> = (
  action$,
  store,
  { setApi }
): Observable<any> =>
  action$.pipe(
    filter(actions.api.connect.match),
    switchMap(action => {
      const { url } = action.payload;
      const provider = new WsProvider(url);
      const instance = new ApiRx({ provider, types: {} });
      return instance.isReady;
    }),
    map(api => {
      setApi(api);
      return actions.api.connected();
    })
  );

export default connect;
```
It creates a new Instance of the Polkadot API, and makes sure it connects to the specified API. After connecting it emits another action which informs about the updated connection state.
3. This action will then again arrive at the reducer, where it will update the `connectStatus` from `Connecting` to `Connected`.
    



### File Actions:
* `actions.file.notifySaved(name: string, methods: Array<string>, hash: string, json: string)` 
### API Actions:
* `actions.api.connected()`
* `actions.api.disconnected()`
### Instance Actions:  
* `actions.instance.instantiationRespnse(status: ContractStatus, message: UIMessage, address: string)` 
  - This action is dispatched by the middleware to inform about the instantiation progress of the contract on chain. 
  - Will do an RPC call on a smart contract which is deployed on the chain. Needs the contracts address and the method to call, the amount of gas which should be used is optional, defaults to 800000000.
* `actions.instance.callResponse(message: UIMessage)` 
  - The middleware will process the calls and rpcCalls. As soon as there are some answers from the Canvas Node regarding the calls ('onChain', 'Finalized', 'outOfGas'...), this action will be dispatched by the middleware which is executing the call.



  
  
