import {
  CasperWalletApiUrl,
  CSPR_API_PROXY_HEADERS,
  DataResponse,
  IGetGetCurrentEraIdParams,
  IGetValidatorsParams,
  IGetValidatorsWithStakesParams,
  isValidatorsError,
  IValidator,
  IValidatorsRepository,
  ValidatorsError,
} from '../../../domain';
import type { IHttpDataProvider } from '../../../domain';
import { ValidatorDto, ValidatorWithStateDto } from '../../dto';
import { IApiValidator, IApiValidatorWithStake, IAuctionMetricsResponse } from './types';

export * from './types';

export class ValidatorsRepository implements IValidatorsRepository {
  constructor(private _httpProvider: IHttpDataProvider) {}

  async getValidators({ network, withProxyHeader = true }: IGetValidatorsParams) {
    try {
      const eraId = await this.getCurrentEraId({ network, withProxyHeader });

      const validatorsList = await this._httpProvider.get<DataResponse<IApiValidator[]>>({
        url: `${CasperWalletApiUrl[network]}/validators`,
        params: {
          page: 1,
          page_size: -1, // TODO pagination?
          era_id: eraId,
          includes: 'account_info,average_performance',
          is_active: true,
        },
        ...(withProxyHeader ? { headers: CSPR_API_PROXY_HEADERS } : {}),
        errorType: 'getValidators',
      });

      return (validatorsList?.data ?? []).map(apiValidator => {
        return new ValidatorDto(apiValidator);
      });
    } catch (e) {
      this._processError(e, 'getValidators');
    }
  }

  async getValidatorsWithStakes({
    network,
    publicKey,
    withProxyHeader = true,
  }: IGetValidatorsWithStakesParams): Promise<IValidator[]> {
    try {
      const eraId = await this.getCurrentEraId({ network, withProxyHeader });

      const validatorsList = await this._httpProvider.get<DataResponse<IApiValidatorWithStake[]>>({
        url: `${CasperWalletApiUrl[network]}/accounts/${publicKey}/delegations`,
        params: {
          page: 1,
          page_size: 100, // TODO Pagination?
          era_id: eraId,
          includes: 'account_info,validator_account_info,bidder',
        },
        ...(withProxyHeader ? { headers: CSPR_API_PROXY_HEADERS } : {}),
        errorType: 'getValidatorsWithStakes',
      });

      return (validatorsList?.data ?? []).map(apiValidator => {
        return new ValidatorWithStateDto(apiValidator);
      });
    } catch (e) {
      this._processError(e, 'getValidatorsWithStakes');
    }
  }

  async getCurrentEraId({ withProxyHeader, network }: IGetGetCurrentEraIdParams): Promise<number> {
    try {
      const resp = await this._httpProvider.get<DataResponse<IAuctionMetricsResponse>>({
        url: `${CasperWalletApiUrl[network]}/auction-metrics`,
        ...(withProxyHeader ? { headers: CSPR_API_PROXY_HEADERS } : {}),
        errorType: 'getCurrentEraId',
      });

      if (!resp?.data?.current_era_id) {
        throw new ValidatorsError(new Error('Missing current_era_id value'), 'getCurrentEraId');
      }

      return resp.data.current_era_id;
    } catch (e) {
      this._processError(e, 'getCurrentEraId');
    }
  }

  private _processError(e: unknown, type: keyof IValidatorsRepository): never {
    if (isValidatorsError(e)) {
      throw e;
    }

    throw new ValidatorsError(e, type);
  }
}
