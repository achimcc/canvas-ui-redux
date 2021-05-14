export type ContractStatus =
  | 'Endpoint'
  | 'Upload'
  | 'Settings'
  | 'Deployed'
  | 'Deploying'
  | 'Error';

export interface UIMessage {
  text: string;
  isError: boolean;
}

export interface UIContract {
  name: string;
  id: string;
  methods: Array<string>;
  wasm: Uint8Array;
  json: string;
}

export interface Instance {
  id: string;
  address: string;
}

export interface ContractInstance {
  contractId: string;
  address: string | undefined;
}

export type ConnectStatus = 'Unconnected' | 'Connected' | 'Error';
