import React, { useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useFarms,
  usePriceBnbBusd,
  usePools2,
  usePrices,
  getTotalValueFromQuoteTokens,
  lookupPrice,
} from 'state/hooks'
import { QuoteToken, Pool2Category } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import BondsDashboard from 'views/BondsDashboard'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Hero2 from './components/Hero'



const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const farms = useFarms()
  const pools2 = usePools2(account)
  const prices = usePrices()
  const block = useBlock()

  const poolsWithApy = pools2.map((pool2) => {

    let quoteTokens = new BigNumber(pool2.quoteTokenPerLp).times(pool2.totalStaked).div(new BigNumber(10).pow(18))
    if (pool2.isSingleAsset) {
        // Handle single staking pools
        quoteTokens = new BigNumber(pool2.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    }

    const tvl = getTotalValueFromQuoteTokens(quoteTokens, pool2.quoteTokenSymbol, prices)
    // console.log(pool2.sousId, quoteTokens && quoteTokens.toNumber(), tvl && tvl.toNumber())

    // console.log("APY", pool2, tvl && tvl.toNumber())
    const rewardTokenPrice = lookupPrice(QuoteToken.RVRS, prices)
    // console.log("price", pool2.tokenName, rewardTokenPrice && rewardTokenPrice.toNumber())

    const totalRewardPricePerYear = rewardTokenPrice.times(pool2.tokenPerBlock).times(BLOCKS_PER_YEAR)
    // const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool2.totalStaked))
    const apy = totalRewardPricePerYear.div(tvl).times(100)
    // console.log("TVL", pool2.stakingTokenName, tvl && tvl.toNumber(), apy && apy.toNumber())

    return {
      ...pool2,
      isFinished: pool2.sousId === 0 ? false : pool2.isFinished && block > pool2.endBlock,
      apy,
      tvl
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool2) => pool2.isFinished)
  const { url, isExact } = useRouteMatch()

  
  const [modalOpen, setModalOpen] = useState(true) 

  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }  

  const TranslateString = useI18n()

  return (
    <Page>

{/*   <Wrapper>
        <ButtonMenu activeIndex={isExact ? 0 : 1} size="sm">
          <ButtonMenuItem as={Link} to={`${url}`} >
            {TranslateString(698, 'Active')}
          </ButtonMenuItem>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            {TranslateString(700, 'Inactive')}
          </ButtonMenuItem>
        </ButtonMenu>
      </Wrapper> */}

      <BondsDashboard/>

      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {orderBy(openPools, ['sortOrder']).map((pool2) => (
              <PoolCard key={pool2.sousId} pool2={pool2} />
            ))}
            {/* <Coming /> */ }
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool2) => (
            <PoolCard key={pool2.sousId} pool2={pool2} />
          ))}
        </Route>
      </FlexLayout> 

    </Page>
  )
}

export default Farm


