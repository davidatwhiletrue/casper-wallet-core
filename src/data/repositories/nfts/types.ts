import { ExtendedDeployContractPackageResult } from '../deploys';

export interface NFTTokenMetadataEntry {
  key: string;
  value: string;
}

export interface IApiNft {
  tracking_id: string;
  token_standard_id: number;
  is_burned: boolean;
  contract_package_hash: string;
  contract_package?: ExtendedDeployContractPackageResult;
  token_id: string;
  owner_account_hash: string;
  owner_public_key: string;
  metadata: NFTTokenMetadataEntry[];
  offchain_metadata: Record<string, unknown>;
  onchain_metadata: Record<string, unknown>;
  timestamp: string;
  block_height: number;
  offchain_metadata_status: number;
  owner_hash: string;
  owner_type: number;
}

export type NFtMetadataEntry = [key: string, value: string];

export interface ImageProxyUrlProps {
  ttl: string;
  width?: string | number;
}
