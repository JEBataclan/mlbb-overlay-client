import React from 'react'
import styled from 'styled-components'

const PickContainer = styled.div`
    position: relative;
    flex: 1;
`;

const PickSplash = styled.div`
    width: 100%;
    height: 100%;
    ${({ hero }) => hero ? (`
        background-image: url("${require(`../../assets/centered_splash_arts/${hero}.png`)}");
        background-size: cover;
        background-repeat: no-repeat;
    `) : (`
        &:before {
            content: "";
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            background-image: url("${require("../../assets/gear-logo.svg").default}");
            background-size: 25%;
            background-repeat: no-repeat;
            background-position: 50% 25%;
            opacity: 0.25;
        }
    `)}

    ${({ active }) => active && `
        animation: pick-shadow 3s infinite;
        
        @keyframes pick-shadow {
            50% {box-shadow: inset 0px 0px 40px white;}
        }
    `}
`;

const HeroName = styled.p`
    position: absolute;
    top: 110px;
    width: 420px;
    height: 30px;
    color: white;
    font-size: 24px;
    line-height: 24px;
    direction: ${({ team }) => team === 'blue' ? 'rtl' : 'ltr'};
    text-indent: 16px;
`;

const FillerSplash = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("${require("../../assets/gear-logo.svg").default}");
    background-size: 25%;
    background-repeat: no-repeat;
    background-position: 50% 25%;
    opacity: 0.25;
`

const PlayerNameContainer = styled.div`
    position: absolute;
    top: 140px;
    width: 420px;
    height: 40px;
    background: ${({ team }) => team === 'blue' ? `linear-gradient(270deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 100%)` : `linear-gradient(90deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 100%);`};
`;

const PlayerName = styled.p`
    color: white;
    font-size: 36px;
    line-height: 40px;
    font-weight: 700;
    direction: ${({ team }) => team === 'blue' ? 'rtl' : 'ltr'};
    text-indent: 16px;
`;

const Pick = ({ team, hero, playerName, active }) => {
    return (
        <PickContainer>
            <PickSplash hero={hero} active={active} />
            <HeroName team={team}>{hero}</HeroName>
            <PlayerNameContainer team={team}>
                <PlayerName team={team}>{playerName}</PlayerName>
            </PlayerNameContainer>
        </PickContainer>
    )
}

export default Pick

//background-image: url("${({ hero }) => hero && require(`../../assets/centered_splash_arts/${hero}.png`)}");