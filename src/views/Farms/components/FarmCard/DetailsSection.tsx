import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@pancakeswap-libs/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Address } from 'config/constants/types'
import { FaScroll } from 'react-icons/fa'

export interface ExpandableSectionProps {
  isTokenOnly?: boolean
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
}

const Divider3 = styled.div`
  background-color: #4c68ef;
  height: 2px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;`

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  isTokenOnly,
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })

  return (

    <Wrapper>

      {!removed && (
        <Flex justifyContent="space-between">
          <span><FaScroll/> Total Deposited</span><Text bold>{totalValueFormated}</Text>
          
        </Flex>
      )}

<Divider3/>

      <Flex justifyContent="flex-start">
        <StyledLinkExternal external href={bscScanAddress} bold={false} style={{"color": "#4c68ef"}}>
          {TranslateString(999, 'View on Explorer')}
        </StyledLinkExternal>
      </Flex>

      <Flex justifyContent="flex-start">
        <StyledLinkExternal external href='https://vfat.tools/harmony/artemisprotocol/' bold={false} style={{"color": "#4c68ef"}}>
          {TranslateString(999, 'More on VFAT')}
        </StyledLinkExternal>
      </Flex>

    </Wrapper>
  )
}

export default DetailsSection
