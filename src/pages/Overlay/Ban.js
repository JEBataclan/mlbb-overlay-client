import React from 'react'
import styled from 'styled-components'

const BanContainer = styled.div`
    flex: 1;
    box-shadow: ${({ team }) => team === "blue" ? "-6px" : "6px"} 0 0 #fff;
`;
const BanSplash = styled.div`
    width: 100%;
    height: 100%;
    ${({ hero }) => hero && `background-image: url("${require(`../../assets/centered_splash_arts/${hero}.png`)}");`}
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transition: filter 0.5s ease-in-out;

    ${({ active }) => active &&
    `
        animation: pick-shadow 3s infinite;
        
        @keyframes pick-shadow {
            50% {box-shadow: inset 0px 0px 80px white;}
        }
    `}
    ${({ active, hero, team }) => (!active && hero) &&
    `
      filter: sepia(100%) saturate(70%) contrast(60%) drop-shadow(${team === "blue" ? "-6px" : "6px"} 0 0 #fff);
    `}
`;

const Ban = ({ team, hero, active }) => {
  return (
    <BanContainer team={team}>
      <BanSplash hero={hero} active={active} team={team}/>
    </BanContainer>
  )
}

export default Ban