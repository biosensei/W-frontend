import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceCakeBusd } from 'state/hooks'
import {Link} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import UnlockButton from 'components/UnlockButton'
import { FaTwitter, FaDiscord, FaBook, FaEnvelopeOpenText, FaGithub, FaClipboard } from 'react-icons/fa'


function getWindowDimensions() {
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  return {
    viewportWidth,
    viewportHeight
  };
}

const twitterIcon = () => <FaTwitter />
const gitIcon = () => <FaGithub />
const clipboardIcon = () => <FaClipboard />
const discordIcon = () => <FaDiscord />
const governanceIcon = () => <FaBook />


const {viewportWidth, viewportHeight} = getWindowDimensions()

const isOnPhone = viewportWidth < 680



  const Wallet = styled.button`
    -webkit-box-align: center;
    align-items: center;
    background-color: rgba(0, 0, 0,0) !important;
    border: 1px;
    border-style: solid !important;
    border-color: #ffff !important;
    border-radius: 10px;
    color: #ffff;
    font-size: 15px;
    font-weight: 500;
    width: 100%;
    display: inline-flex;
    min-height: 18px;
    max-height: 35px;
    max-width: 102px;
    padding: 12px;

    text-shadow: 0px 0px 5px #fff;
    box-shadow: 0px 0px 5px #fff;
  `

const NavTab = ({ path, text }) => {
  return (
    <li className="nav-tab">
      <Link to={path}>
        <span className="tab-span">{text}</span>
      </Link>
    </li>
  )
}

const NavIcon = ({ icon, href, newTab}: any) => {
  const targetProp: string = newTab === true ? '' : ''
  const relProp: string = newTab === true ? 'noreferrer' : ''

  return (
    <li>
      { newTab ?
        <a target="_blank" rel="noreferrer" href={href} className="nav-icon">
          {icon}
        </a>
      :
        <a href={href}
           className="nav-icon"
           onClick={() => navigator.clipboard.writeText('0xED0B4b0F0E2c17646682fc98ACe09feB99aF3adE')}>
          {icon}
        </a>
      }
    </li>
  )
}

const NavBar = (props) => {
  const { account, connect, reset } = useWallet()
  const cakePriceUsd = usePriceCakeBusd()
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <header>
        <div className="nav-wrapper">
          <nav>
            <object
              type="image/svg+xml"
              data="/images/banner.svg"
              width="230px"
              style={{'marginTop': '50px',
                      'marginBottom': '15px',
                      'marginLeft': '10px'}}>
              &nbsp;
            </object>
            <input className="hidden" type="checkbox" checked={isChecked} id="menuToggle" />

            <div className="nav-container">
              <ul className="nav-tabs">
                <NavTab path='/stake' text='Stake' />
                <NavTab path='/farm' text='Farm' />
                <NavTab path='/reverseum' text='Reverseum Pools' />
                <NavIcon icon={twitterIcon()} href="https://twitter.com/RVRSProtocol" newTab />
                <NavIcon icon={gitIcon()} href="https://github.com/ReverseProtocol" newTab />
                <NavIcon icon={governanceIcon()} href="https://gov.harmony.one/#/reverse" newTab />
                <NavIcon icon={discordIcon()} href="https://discord.gg/ANBzKtMV8c" newTab />
                <NavIcon icon={clipboardIcon()} href="#0" />
                <li className="web3li outsideMainNav">
                  <Link
                    to="/"
                    className="nav-links connect">
                    { account != null && account.length > 1 ?
                      <Wallet
                        style={{
                        'marginTop': '-5px',
                        'marginLeft': '30px'}}>
                          {account.substring(0,( isOnPhone ? 8 : 8))}

                        <p style={{'color': 'white'}}>...</p>
                      </Wallet>
                      :
                      <UnlockButton style={{
                        marginLeft: '35px',
                        marginTop: '-4px',
                        width: '100%',}}>...
                      </UnlockButton>
                    }
                  </Link>
                </li>
              </ul>
              <ul className="web3buttons">
              <li className="web3li insideMainNav">
                <Link to="/" className="nav-links connect">
                { account != null && account.length > 1?
                  <Wallet>{account.substring(0,( isOnPhone ? 8 : 8)).concat("")}
                    <p style={{'color': 'white'}}>...</p>
                  </Wallet>:

                  <UnlockButton style={{
                    backgroundColor: 'rgb(22, 35, 73) !important',
                    border: '1px',
                    color: '#8299dd !important',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: '200',
                    width: '80%',
                    display: 'inline-flex',
                    height: '44px',
                    letterSpacing: '0.03em',
                    padding: '15px',
                    minHeight: '21px',
                    maxHeight: '33px',
                  }}>
                    Connect
                  </UnlockButton>
                }
                </Link>
              </li>
             </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}


export default NavBar
