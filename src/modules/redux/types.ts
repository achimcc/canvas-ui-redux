import { ApiRx } from '@polkadot/api';

export type ContractStatus = 'Settings' | 'Instantiating' | 'Instantiated' | 'Error';

export interface UIMessage {
  text: string;
  isError: boolean;
}

export interface ContractFile {
  name: string;
  hash: string;
  methods: Array<string>;
  json: string;
}

export interface Instance {
  hash: string;
  address: string;
}

export interface ContractInstance {
  contractId: string;
  address: string | undefined;
}

export type ConnectStatus = 'Unconnected' | 'Connecting' | 'Connected' | 'Error';

export interface Dependencies {
  setApi: (apiToSet: ApiRx) => void;
  getApi: () => ApiRx;
}
