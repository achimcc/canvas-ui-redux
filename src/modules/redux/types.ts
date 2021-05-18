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

export interface ContractFile {
  name: string;
  hash: string;
  methods: Array<string>;
  wasm: Uint8Array;
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

export type ConnectStatus = 'Unconnected' | 'Connected' | 'Error';
