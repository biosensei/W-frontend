import { QuoteToken, PoolCategory, Pool2Config } from './types'

const pools2: Pool2Config[] = [
  {
    sousId: 1,
    tokenName: 'MIS',
    quoteTokenSymbol: QuoteToken.MIS,
    stakingTokenName: QuoteToken.MIS,
    // this is MIS
    stakingTokenAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
    // this is MIS
    quoteTokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
    // this is MIS
    tokenPoolAddress: '0xd74433b187cf0ba998ad9be3486b929c76815215',
    contractAddress: {
      1666700000: '0x097C88dE6716f374F84381D39aaCc0ec1433928C',
      1666600000: '0x097C88dE6716f374F84381D39aaCc0ec1433928C',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://www.app.artemisprotocol.one',
    harvest: true,
    tokenPerBlock: '0.06',
    sortOrder: 1,
    isFinished: false,
    isDepositFinished: false,
    startBlock: 18519057,
    endBlock: 20939210,
    lockBlock: 19728610,
    tokenDecimals: 18,
   },
]

export default pools2
