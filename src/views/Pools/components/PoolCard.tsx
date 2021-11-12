import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Flex, MinusIcon } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import Card from './Card'
import {usePriceCakeBusd} from "../../../state/hooks";
import useWithdrawFeeTimer from "./useWithdrawFeeTimer";
import WithdrawalFeeTimer from "./withdrawFeeTimer";

const Quote = styled.p`
    font-size: 15px;
    margin-bottom: 0px;
`

const QuoteTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0px;
  text-shadow: 1px 1px 5px #ccc;
  margin-top: 5px;
`

const QuoteTitle2 = styled.p`
  color: #979797;
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 0px;
  text-shadow: 0px 0px 0px #ccc;
`

const SmallText = styled.p`
  color: #979797;
  font-size: 15px;
  font-weight: 200;
  margin-bottom: 0px;
  margin-left: 20px;
`

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`


interface PoolWithApy extends Pool {
  apy: BigNumber
  apr: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    stakingTokenName,
    stakingTokenAddress,
    harvest,
    apr,
    apy,
    tokenDecimals,
    poolCategory,
    totalStaked,
    isFinished,
    userData,
    stakingLimit,
    tokenPoolAddress,
    quoteTokenPoolAddress,
    earnToken,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)
  const rvrsPrice = usePriceCakeBusd()

  const { secondsRemaining, hasUnstakingFee } = useWithdrawFeeTimer(
      userData ? userData.lastDepositedTime.toNumber() : 0,
      parseInt('259200', 10)
  );

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const stakedBalanceUsd = stakedBalance.times(rvrsPrice)

  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  const TVL = pool.tvl && pool.tvl.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })

  const APY = apy && apy.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })



  const APR = new BigNumber(apr);

  const UserStakedRVRS = stakedBalance.toNumber();

  const Expected7DayRVRS = new BigNumber(UserStakedRVRS).times(APR).div(52).toLocaleString();


  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>

      <div style={{padding: '34px'}}>

      <Wrapper justifyContent="space-between" 
      alignItems="center" mb="0px" 
      paddingLeft='150px' paddingRight='150px' marginTop='20px' >

        <Flex  flexDirection="column" alignItems='center'>
          <QuoteTitle2>APY</QuoteTitle2>
          <QuoteTitle>{APY}%</QuoteTitle>
        </Flex>

        <Flex  flexDirection="column" alignItems='center' marginTop='0px'>
          <QuoteTitle2> TVL</QuoteTitle2>
          <QuoteTitle >${TVL}</QuoteTitle>
        </Flex>


        </Wrapper>


        <Flex justifyContent='space-between' marginTop='26px'>
          <span>Unstaked Balance</span>
          <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
        </Flex>


        <Flex justifyContent='space-between' marginTop='8px'>
          <span>Staked Balance</span>
          <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
        </Flex>

        <Flex justifyContent='space-between' marginTop='2px'>
          <SmallText>Balance in UST</SmallText>
          <SmallText>${getBalanceNumber(stakedBalanceUsd).toLocaleString('en-us',{ maximumFractionDigits: 0 })}</SmallText>
        </Flex>

        <Flex justifyContent='space-between' marginTop='2px'>
          <SmallText>Expected Balance (7 Days)</SmallText>
          <SmallText>{Expected7DayRVRS}</SmallText>
        </Flex>

        <Flex justifyContent='space-between' marginTop='8px'>
          <span> 0.2% Withdrawal Fee Until</span>
          <WithdrawalFeeTimer secondsRemaining={secondsRemaining} />
        </Flex>

        <StyledCardActions  >
          
          {!account && <UnlockButton />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} marginTop='20px' onClick={handleApprove} fullWidth >
                  Approve
                </Button>
              </div>
            ) : (
              <>
                <IconButton marginTop='20px' marginLeft='0px'
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  onClick={
                    isOldSyrup
                      ? async () => {
                          setPendingTx(true)
                          await onUnstake('0')
                          setPendingTx(false)
                        }
                      : onPresentWithdraw
                  }>
                Withdraw
                </IconButton>

                <StyledActionSpacer />

                {!isOldSyrup && (
                <IconButton marginTop='20px' marginRight='0px' disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>

                  <AddIcon color="background" />
                </IconButton>)}
              </>
            ))}


        </StyledCardActions>
      </div>
    </Card>
  )
}


const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  width: 100%;
  margin-bottom: 15px;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;
`

export default PoolCard
