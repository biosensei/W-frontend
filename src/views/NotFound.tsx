import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`
const Sub = styled.p`
  font-size: 30px;
  color: #fafafa;
  margin-top: 50px;
  margin-bottom: 30px;
`

const NotFound = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledNotFound>
        <object type="image/svg+xml" data="images/ppltalking.svg" height="370px">&nbsp;</object>
        <Sub >{TranslateString(999, 'Currently Unavailable')}</Sub>
        <Button as="a" variant='secondary' href="/earn" size="md">
          {TranslateString(999, 'Dashboard')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
