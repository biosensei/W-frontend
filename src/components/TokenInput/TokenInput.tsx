import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js/bignumber'
import { Button } from '@pancakeswap-libs/uikit'
import useI18n from '../../hooks/useI18n'
import Input, { InputProps } from '../Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
  depositFeeBP?: number
  valueUsd?: number | string
}


const TokenInput: React.FC<TokenInputProps> = (
    { max, symbol, onChange, onSelectMax, value, depositFeeBP = 0, valueUsd= 0 }) => {
  const TranslateString = useI18n()
  return (
    <StyledTokenInput>
      <StyledMaxText>
        {max.toLocaleString()} {symbol} {TranslateString(526, 'Available')}
      </StyledMaxText>
        <Staked>
          {/* ~${valueUsd.toLocaleString()} TODO-center this somehow */}
      </Staked>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol style={{"color": "#4c68ef "}}>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <Button size="md" style={{'borderRadius': '5px', 'color': 'white'}} onClick={onSelectMax}>
                {TranslateString(452, 'Max')}
              </Button>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
      {
        depositFeeBP > 0 ?
          <StyledMaxText>
            {TranslateString(10001, 'Deposit Fee')}: {new BigNumber(value || 0).times(depositFeeBP/10000).toString()} {symbol}
          </StyledMaxText>
          :
          null
      }

    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div``

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const Staked = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textSubtle};
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`

export default TokenInput
