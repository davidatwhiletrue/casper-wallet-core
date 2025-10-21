import { CasperNetwork, IContractInfo, Network } from '../common';
import { ICsprBalance, IToken, NftStandard } from '../../domain';
import { IEnv } from '../env';
import { CasperNetworkName } from 'casper-js-sdk';

export const CSPR_DECIMALS = 9;

export const CasperLiveUrl: Record<CasperNetwork, string> = {
  mainnet: 'https://cspr.live',
  testnet: 'https://testnet.cspr.live',
  devnet: 'https://devnet.cspr.live',
  integration: 'https://integration.cspr.live',
};

export const CasperWalletApiUrl: Record<CasperNetwork, string> = {
  mainnet: 'https://api.mainnet.casperwallet.io',
  testnet: 'https://cspr-click-accounts.dev.make.services/api/wallet-proxy',
  devnet: 'https://cspr-wallet-api.dev.make.services',
  integration: 'https://api.integration.casperwallet.io',
};

export const CasperWalletApiEndpoints: Record<IEnv, string> = {
  PRODUCTION: 'https://api.casperwallet.io',
  STAGING: 'https://cspr-wallet-api.stg.make.services',
};

export const OnRampApiUrl = 'https://onramp-api.cspr.click/api';

export const GrpcUrl: Record<CasperNetwork, string> = {
  mainnet: 'https://node.cspr.cloud/rpc',
  testnet: 'https://cspr-click-accounts.dev.make.services/api/node-proxy/rpc',
  devnet: 'https://cspr-api-gateway.dev.make.services/cspr-node-proxy-rpc-dev-condor/rpc',
  integration: 'https://node.integration.cspr.cloud/rpc',
};

export const CasperSdkNetworkName: Record<CasperNetwork, string> = {
  mainnet: 'casper',
  testnet: 'casper-test',
  devnet: 'dev-net',
  integration: 'integration-test',
};

export const AuctionManagerContractHash: Record<Network, string> = {
  mainnet: 'ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea',
  testnet: '93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2',
  devnet: '',
  integration: '',
};

export const AuctionPoolContractHash: Record<Network, string> = {
  mainnet: '6174cf2e6f8fed1715c9a3bace9c50bfe572eecb763b0ed3f644532616452008',
  testnet: '6174cf2e6f8fed1715c9a3bace9c50bfe572eecb763b0ed3f644532616452008',
  devnet: '',
  integration: '',
};

export const CSPRMarketContractHash: Record<Network, string> = {
  mainnet: '31cc023b17c903a963ec60eab96a60f1fa37cb74b4b3bafc91a441e0e9d70f97',
  testnet: '154ff59b5f9feec42d3a418058d66badcb2121dc3ffb2e3cf92596bf5aafbc88',
  devnet: '',
  integration: '',
};

export const CSPRStudioCep47ContractHash: Record<Network, string> = {
  mainnet: 'c4e5a03066ce3c6006f562939e48f7076c77de5d46cf8fe625c41e02c5e74814',
  testnet: '998af6825d77da15485baf4bb89aeef3f1dfb4a78841d149574b0be694ce4821',
  devnet: '',
  integration: '',
};

export const AssociatedKeysContractHash: Record<Network, string> = {
  mainnet: 'b2ec4f982efa8643c979cb3ab42ad1a18851c2e6f91804cd3e65c079679bdc59',
  testnet: '676794cbbb35ff5642d0ae9c35302e244a7236a614d7e9ef58d0fb2cba6be3ed',
  devnet: '',
  integration: '',
};

export const ExecutionTypesMap: Record<number, string> = {
  1: 'wasmDeploy', //"ModuleBytes"
  2: 'contractCall', //"StoredContractByHash"
  3: 'contractCall', //"StoredContractByName",
  4: 'contractCall', //"StoredVersionedContractByHash",
  5: 'contractCall', //"StoredVersionedContractByName",
  6: 'transfer',
};

export const CSPR_COIN: IToken = {
  contractHash: '',
  contractPackageHash: '',
  decimals: CSPR_DECIMALS,
  iconUrl: 'CSPR',
  id: 'CSPR-mainnet',
  name: 'Casper',
  network: 'mainnet',
  symbol: 'CSPR',
  balance: '0',
  decimalBalance: '0',
  formattedDecimalBalance: '0',
  isNative: true,
} as const;

export const CSPR_BALANCE: ICsprBalance = {
  accountHash: '',
  publicKey: '',

  totalBalance: '0',
  totalDecimalBalance: '0',
  totalFormattedDecimalBalance: '0',

  liquidBalance: '0',
  liquidDecimalBalance: '0',
  liquidFormattedDecimalBalance: '0',

  delegatedBalance: '0',
  delegatedDecimalBalance: '0',
  delegatedFormattedDecimalBalance: '0',

  undelegatingBalance: '0',
  undelegatingDecimalBalance: '0',
  undelegatingFormattedDecimalBalance: '0',
} as const;

export const CSPR_TRANSFER_PAYMENT_AMOUNT = '0.1';
export const CSPR_DELEGATION_PAYMENT_AMOUNT = '2.5';
export const CSPR_DELEGATION_MIN_AMOUNT = '500';
export const CSPR_TRANSFER_MIN_AMOUNT = '2.5';
export const CEP18_DEFAULT_TRANSFER_PAYMENT_AMOUNT = '1.5';
export const NFT_DEFAULT_TRANSFER_PAYMENT_AMOUNT: Record<NftStandard, string> = {
  CEP47: '4',
  CEP78: '15',
  CEP95: '4',
};

export const AuctionManagerContractInfo: Record<CasperNetwork, IContractInfo> = {
  mainnet: {
    contractHash: 'ccb576d6ce6dec84a551e48f0d0b7af89ddba44c7390b690036257a04a3ae9ea',
    contactName: 'Auction',
    contractPackageHash: '86f2d45f024d7bb7fb5266b2390d7c253b588a0a16ebd946a60cb4314600af74',
    contractPackageName: 'Auction',
  },
  testnet: {
    contractHash: '93d923e336b20a4c4ca14d592b60e5bd3fe330775618290104f9beb326db7ae2',
    contactName: 'Auction',
    contractPackageHash: 'e375d42c29c0e4b2baefa63cf2d70af34439eda851e08129d8515515d63bd6a9',
    contractPackageName: 'Auction',
  },
  devnet: {
    contractHash: '',
    contactName: '',
    contractPackageHash: '',
    contractPackageName: '',
  },
  integration: {
    contractHash: '',
    contactName: '',
    contractPackageHash: '',
    contractPackageName: '',
  },
};

export const CSPRMarketContractInfo: Record<CasperNetwork, IContractInfo> = {
  mainnet: {
    contractHash: '5adb720d529964437caf75f3df974edffd204fe511b9e359e7dff28f79d12337',
    contactName: 'CSPR.market',
    contractPackageHash: '31cc023b17c903a963ec60eab96a60f1fa37cb74b4b3bafc91a441e0e9d70f97',
    contractPackageName: 'CSPR.market',
  },
  testnet: {
    contractHash: 'a7b2de3119f20c32ec19a103359e7b2942159a3198bde29687b497c22a9d27bc',
    contactName: 'CSPR.market',
    contractPackageHash: '154ff59b5f9feec42d3a418058d66badcb2121dc3ffb2e3cf92596bf5aafbc88',
    contractPackageName: 'CSPR.market',
  },
  devnet: {
    contractHash: '',
    contactName: '',
    contractPackageHash: '',
    contractPackageName: '',
  },
  integration: {
    contractHash: '',
    contactName: '',
    contractPackageHash: '',
    contractPackageName: '',
  },
};

export const AssociatedKeysContractInfo: Record<CasperNetwork, IContractInfo> = {
  mainnet: {
    contractHash: 'b2ec4f982efa8643c979cb3ab42ad1a18851c2e6f91804cd3e65c079679bdc59',
    contactName: 'Associated Key Manager',
    contractPackageHash: '51f3812fde357ac73c6d89785155be59ddbcba97cf8f5b49362ebdbbd90290d2',
    contractPackageName: 'Associated Key Manager',
  },
  testnet: {
    contractHash: '676794cbbb35ff5642d0ae9c35302e244a7236a614d7e9ef58d0fb2cba6be3ed',
    contactName: 'Associated Key Manager',
    contractPackageHash: 'ff9c3c0c447d2e3a79c02e13d048c03f6fac8a911fdc04118cc754c84ef6259e',
    contractPackageName: 'Associated Key Manager',
  },
  devnet: {
    contractHash: '',
    contactName: '',
    contractPackageHash: '',
    contractPackageName: '',
  },
  integration: {
    contractHash: '',
    contactName: '',
    contractPackageHash: '',
    contractPackageName: '',
  },
};

export const casperChainNameToCasperNetwork: Record<CasperNetworkName, CasperNetwork> = {
  [CasperNetworkName.Mainnet]: 'mainnet',
  [CasperNetworkName.Testnet]: 'testnet',
  [CasperNetworkName.DevNet]: 'devnet',
  [CasperNetworkName.Integration]: 'integration',
};
