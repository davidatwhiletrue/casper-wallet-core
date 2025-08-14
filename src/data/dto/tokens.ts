import Decimal from 'decimal.js';

import { formatTokenBalance, getCep18FiatAmount, getDecimalTokenBalance } from '../../utils';
import {
  CSPR_DECIMALS,
  ICsprBalance,
  ITokenFiatRate,
  ITokenWithFiatBalance,
  Network,
  SupportedFiatCurrencies,
  SupportedMarketDataProviders,
} from '../../domain';
import { ApiToken, IGetCsprBalanceResponse, IGetCurrencyRateResponse } from '../repositories';
import { Maybe } from '../../typings';
import { getMarketDataProviderUrl } from './common';

export class TokenDto implements ITokenWithFiatBalance {
  constructor(network: Network, apiToken?: Partial<ApiToken>) {
    this.contractHash = apiToken?.contractHash;
    this.contractPackageHash = apiToken?.contract_package_hash ?? '';
    this.id = this.contractPackageHash;
    this.balance = apiToken?.balance ?? '0';
    this.network = apiToken?.network ?? network;
    this.decimals = apiToken?.metadata?.decimals ?? 18;
    this.iconUrl = apiToken?.icon_url ?? null;
    this.name = apiToken?.name ?? '';
    this.symbol = apiToken?.metadata?.symbol ?? '';
    this.decimalBalance = getDecimalTokenBalance(this.balance, this.decimals);
    this.formattedDecimalBalance = formatTokenBalance(this.balance, this.decimals);
    this.isNative = this.symbol === 'CSPR';
    this.fiatBalance = getCep18FiatAmount(
      this.decimalBalance,
      apiToken?.coingecko_data?.price ?? apiToken?.friendlymarket_data?.price ?? 0,
      false,
    );
    this.formattedFiatBalance = getCep18FiatAmount(
      this.decimalBalance,
      apiToken?.coingecko_data?.price ?? apiToken?.friendlymarket_data?.price ?? 0,
      true,
    );
    this.fiatPrice = apiToken?.coingecko_data?.price ?? apiToken?.friendlymarket_data?.price ?? 0;
    this.currency = 'USD';
    this.marketDataProvider = apiToken?.coingecko_data?.price
      ? 'CoinGecko'
      : apiToken?.friendlymarket_data?.price
        ? 'FriendlyMarket'
        : null;
    this.marketDataProviderUrl = getMarketDataProviderUrl(
      this.marketDataProvider,
      apiToken?.coingecko_id,
      apiToken?.latest_version_contract_hash,
    );
  }

  readonly balance: string;
  readonly contractHash: string | undefined;
  readonly contractPackageHash: string;
  readonly decimals: number;
  readonly iconUrl: Maybe<string>;
  readonly id: string;
  readonly name: string;
  readonly network: Network;
  readonly symbol: string;
  readonly decimalBalance: string;
  readonly formattedDecimalBalance: string;
  readonly isNative: boolean;

  readonly fiatBalance: string;
  readonly formattedFiatBalance: string;
  readonly fiatPrice: number;
  readonly currency: SupportedFiatCurrencies;
  readonly marketDataProvider: Maybe<SupportedMarketDataProviders>;
  readonly marketDataProviderUrl: Maybe<string>;
}

export class CsprBalanceDto implements ICsprBalance {
  constructor(resp?: Partial<IGetCsprBalanceResponse>) {
    this.accountHash = resp?.account_hash ?? '';
    this.publicKey = resp?.public_key ?? '';

    this.liquidBalance = `${resp?.balance ?? '0'}`;
    this.liquidDecimalBalance = getDecimalTokenBalance(this.liquidBalance, CSPR_DECIMALS);
    this.liquidFormattedDecimalBalance = formatTokenBalance(this.liquidBalance, CSPR_DECIMALS);

    this.delegatedBalance = `${resp?.delegated_balance ?? '0'}`;
    this.delegatedDecimalBalance = getDecimalTokenBalance(this.delegatedBalance, CSPR_DECIMALS);
    this.delegatedFormattedDecimalBalance = formatTokenBalance(
      this.delegatedBalance,
      CSPR_DECIMALS,
    );

    this.undelegatingBalance = `${resp?.undelegating_balance ?? '0'}`;
    this.undelegatingDecimalBalance = getDecimalTokenBalance(
      this.undelegatingBalance,
      CSPR_DECIMALS,
    );
    this.undelegatingFormattedDecimalBalance = formatTokenBalance(
      this.undelegatingBalance,
      CSPR_DECIMALS,
    );

    this.totalBalance = new Decimal(this.liquidBalance)
      .plus(this.delegatedBalance)
      .plus(this.undelegatingBalance)
      .toFixed();
    this.totalDecimalBalance = getDecimalTokenBalance(this.totalBalance, CSPR_DECIMALS);
    this.totalFormattedDecimalBalance = formatTokenBalance(this.totalBalance, CSPR_DECIMALS);
  }

  readonly publicKey: string;
  readonly accountHash: string;

  readonly totalBalance: string;
  readonly totalDecimalBalance: string;
  readonly totalFormattedDecimalBalance: string;

  readonly delegatedBalance: string;
  readonly delegatedDecimalBalance: string;
  readonly delegatedFormattedDecimalBalance: string;

  readonly undelegatingBalance: string;
  readonly undelegatingDecimalBalance: string;
  readonly undelegatingFormattedDecimalBalance: string;

  readonly liquidBalance: string;
  readonly liquidDecimalBalance: string;
  readonly liquidFormattedDecimalBalance: string;
}

export class TokenFiatRateDto implements ITokenFiatRate {
  constructor(resp?: Partial<IGetCurrencyRateResponse>) {
    this.rate = Number(resp?.data?.amount) || 0;
    this.currency = 'USD';
  }

  readonly currency: SupportedFiatCurrencies;
  readonly rate: number;
}
