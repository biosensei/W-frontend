import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  align-self: baseline;
  background: #1E2129;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  position: relative;
  text-align: center;
  margin-bottom:0px;
  border:0px solid #fff;
  box-shadow: 0px 0px 5px #ccc;


  `


  

export default Card
