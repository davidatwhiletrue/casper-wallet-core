import { CasperNetwork, PaginatedResponse } from '../common';
import { INft, NftContentType } from './entities';

export interface INftsRepository {
  getNfts(params: IGetNftsParams): Promise<PaginatedResponse<INft>>;
  deriveNftMediaType(url: string, withProxyHeader?: boolean): Promise<NftContentType>;
}

export interface IGetNftsParams {
  publicKey: string;
  network: CasperNetwork;
  page: number;
  limit?: number;
  withProxyHeader?: boolean;
  withBurned?: boolean;
}
