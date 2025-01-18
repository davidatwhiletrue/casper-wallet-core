import { IValidator } from './entities';
import { CasperNetwork, PaginatedResponse } from '../common';

export interface IValidatorsRepository {
  getCurrentEraId(params: IGetGetCurrentEraIdParams): Promise<number>;
  getValidators(params: IGetValidatorsParams): Promise<PaginatedResponse<IValidator>>;
  getValidatorsWithStakes(params: IGetValidatorsWithStakesParams): Promise<IValidator[]>;
}

export interface IGetValidatorsParams {
  network: CasperNetwork;
  withProxyHeader?: boolean;
  page: number;
  limit?: number;
}

export interface IGetValidatorsWithStakesParams {
  publicKey: string;
  network: CasperNetwork;
  withProxyHeader?: boolean;
}

export interface IGetGetCurrentEraIdParams {
  network: CasperNetwork;
  withProxyHeader?: boolean;
}
