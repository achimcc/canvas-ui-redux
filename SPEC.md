# Canvas UI V2 Spec Document

## User Authentication / Identity
- Users log in by signing a provided challenge with one of their Polkadot accounts, linking the account to their uploaded and favorited contracts
- Alternatively, use local identities with public/private key (TBD)
- User basic info - email address, name, riot account, etc

## Landing Page
- Chain stats and popular contracts with option to favorite
- Left bar:
  - Dropdown to switch chain, user identity
  - Links to owned and favorited contracts, settings page
  - Search bar

## Add New Contract
- Step through instantiation:
  - User provides contract metadata & wasm bundle
  - Constructor and transaction details
  - Confirmation and link to new contract

## Contract View
- Display ontract information, instantiation date, endowment
- Options to favorite or reinstantiate code with user's own account
- Option to update or replace metadata by uploading a new .contract bundle
- Metadata tab: display contract messages from ABI
- Interact tab: call messages on contract via RPC or tx
- Inspect Storage tab: view contract storage entries

## Code View (TBD)
- Display information for code bundle and link to contracts instantiated from it

## Contract Testing (TBD)
- Add on-chain testing template for existing contracts
- Possibly integrate into Contract View?
