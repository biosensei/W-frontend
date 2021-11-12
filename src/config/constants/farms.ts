import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'
import labo  from './labo'


const farms: FarmConfig[] = [
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'RVRS & ONE',
    lpAddresses: {
      1666700000: '0x006d392b015d154f6580f68d659f803f0d22bcee',
      1666600000: '0x006d392b015d154f6580f68d659f803f0d22bcee',
    },
    tokenSymbol: 'ONE',
    tokenAddresses: contracts.one,
    quoteTokenSymbol: QuoteToken.RVRS,
    quoteTokenAdresses: contracts.rvrs,
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'ONE & UST',
    lpAddresses: {
      1666700000: '0x61356C852632813f3d71D57559B06cdFf70E538B',
      1666600000: '0x61356C852632813f3d71D57559B06cdFf70E538B',
    },
    tokenSymbol: 'ONE',
    tokenAddresses: contracts.one,
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
  },
  {
    pid: 3,
    risk: 5,
    lpSymbol: 'UST & RVRS',
    lpAddresses: {
      1666700000: '0x513568f49e384811d7cf7e6de4daa4ddc3c4a779',
      1666600000: '0x513568f49e384811d7cf7e6de4daa4ddc3c4a779',
    },
    tokenSymbol: 'RVRS',
    tokenAddresses: contracts.rvrs,
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
  }
]

export default farms
