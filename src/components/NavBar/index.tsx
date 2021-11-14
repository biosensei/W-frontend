import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceCakeBusd } from 'state/hooks'
import {Link} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import UnlockButton from 'components/UnlockButton'
import { FaTwitter, FaDiscord, FaBook, FaEnvelopeOpenText, FaGithub } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import labo from 'config/constants/labo';

function getWindowDimensions() {
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  return {
    viewportWidth,
    viewportHeight
  };
}

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

                <input className="hidden" type="checkbox" checked={isChecked} id="menuToggle"/>
                <button type="button" className="menu-btn" onClick={()=>{setIsChecked(!isChecked)}}>
                  <div className="menu"/>
                  <div className="menu"/>
                  <div className="menu"/>
                </button>
                
                  <div className="nav-container">
                      <ul className="nav-tabs">

                      <li className="nav-tab">
                          <Link to="/stake" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <span  className="dditem">Stake</span>
                          </Link>
                        </li>

                        <li className="nav-tab">
                          <Link to="/farm" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <span className="dditem">Farm</span>
                          </Link>
                        </li>

                        <li className="nav-tab">
                          <Link to="/bonding" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                            <span className="dditem">Bonding Pools</span>
                          </Link>
                        </li>
                        
                        <li>
                          <a target="_blanK" rel="noreferrer" href="https://gov.harmony.one/#/reverse" className="nav-links">
                            <FaEnvelopeOpenText style={{'marginTop': '10px', 'marginLeft': '20px'}}/></a>
                        </li>

                        <li>
                          <a target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/" className="nav-links">
                            <FaBook style={{'marginTop': '10px', 'marginLeft': '20px'}}/></a>
                        </li>


                        <li>
                          <a target="_blanK" rel="noreferrer" href="https://github.com/ReverseProtocol" className="nav-links">
                            <FaGithub style={{'marginTop': '10px', 'marginLeft': '20px'}}/></a>
                        </li>

                        <li>
                          <a target="_blanK" rel="noreferrer" href="https://twitter.com/RVRSProtocol" className="nav-links">
                            <FaTwitter style={{'marginTop': '10px', 'marginLeft': '20px'}}/></a>
                        </li>


                        <li className="web3li outsideMainNav">
                          <Link 
                          to="/" 
                          className="nav-links connect">
                          { account != null && account.length > 1? 
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
                              width: '80%',}}>...
                            </UnlockButton>}
                          </Link>
                        </li>
                 </ul>
                
                <ul className="web3buttons">


                <li className="web3li insideMainNav">
                  <Link to="/" className="nav-links connect">
                  { account != null && account.length > 1? 
                    <Wallet>{account.substring(0,( isOnPhone ? 8 : 8)).concat("")} <p style={{'color': 'white'}}>...</p></Wallet>:

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
                  }}>Connect</UnlockButton>
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
