import { QuoteToken, PoolCategory, Pool2Config } from './types'

const pools2: Pool2Config[] = [
  {
    sousId: 1,
    tokenName: 'UST',
    quoteTokenSymbol: QuoteToken.UST,
    stakingTokenName: QuoteToken.UST,
    // this is UST
    stakingTokenAddress: '0x224e64ec1BDce3870a6a6c777eDd450454068FEC',
    quoteTokenPoolAddress: '0x224e64ec1BDce3870a6a6c777eDd450454068FEC',
    tokenPoolAddress: '0x5A24E33c1F3AC55B96F818D40d0ad97F71b42658',
    contractAddress: {
      1666700000: '0xb4b35A9bA3cef0565A0039392f9c58982E9aA573',
      1666600000: '0xb4b35A9bA3cef0565A0039392f9c58982E9aA573',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.app.artemisprotocol.one',
    harvest: true,
    tokenPerBlock: '0.1',
    sortOrder: 1,
    isFinished: false,
    isDepositFinished: false,
    startBlock: 19368333,
    endBlock: 19411533,
    lockBlock: 19411533,
    tokenDecimals: 18,
   },
   {
    sousId: 2,
    tokenName: 'RVRS & ONE LP',
    tokenPoolAddress: '0x5A24E33c1F3AC55B96F818D40d0ad97F71b42658',
    quoteTokenSymbol: QuoteToken.RVRS,
    quoteTokenPoolAddress: '0x5A24E33c1F3AC55B96F818D40d0ad97F71b42658',
    stakingTokenName: QuoteToken.ONERVRS,
    stakingTokenAddress: '0x006d392b015d154f6580f68d659f803f0d22bcee',
    contractAddress: {
      1666700000: '0x7429FF70159be178c8a92bEd81068BcB2a6d0686',
      1666600000: '0x7429FF70159be178c8a92bEd81068BcB2a6d0686',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.app.artemisprotocol.one',
    harvest: true,
    tokenPerBlock: '0.1',
    sortOrder: 1,
    isFinished: false,
    isDepositFinished: false,
    startBlock: 19368333,
    endBlock: 19411533,
    lockBlock: 19411533,
    tokenDecimals: 18,
  }
]

export default pools2
