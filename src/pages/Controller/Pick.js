import React from 'react'
import styled from 'styled-components'
import { Input } from "../../globalStyles";

const PickContainer = styled.div`
  flex: 1;
  ${({ hero }) => hero && `
    background-image: url("${require(`../../assets/centered_splash_arts/${hero}.png`)}");
    background-repeat: no-repeat;
    background-position: 50% 5%;
    background-size: cover;
  `};
`

const Pick = ({ IGN, index, team, hero, handlePlayerNameChange, handleTeamInfosBlur, handleDragStart, handleDragOver, handleDrop }) => {
  return (
    <PickContainer
      slot={index}
      hero={hero}
      draggable="true"
      onDragStart={e => handleDragStart(e)}
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e, team)}
    >
      <Input
        value={IGN}
        placeholder={`Player ${index + 1} IGN`}
        onChange={handlePlayerNameChange}
        onBlur={handleTeamInfosBlur} />
    </PickContainer>
  )
}

export default Pick