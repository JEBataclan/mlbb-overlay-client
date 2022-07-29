import React from 'react'
import styled from 'styled-components'

const HeroContainer = styled.img`
    flex: 1;
    padding: 4px;
    max-width: 60px;
    max-height: 60px;
    ${({ hero }) => hero && `
        background-image: url(${require(`../../assets/icons/${hero}.png`)});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    `}
`;

const Hero = ({ hero, handleHeroOnClick }) => {
  return (
    <HeroContainer src={require(`../../assets/icons/${hero}.png`)} alt={hero} onClick={() => handleHeroOnClick(hero)} />
  )
}

export default Hero