import React from 'react'
import styled from 'styled-components'

const BanContainer = styled.div`
    flex: 1;
    width: 50px;
    height: 50px;
    ${({ hero }) => hero && `
        background-image: url("${require(`../../assets/icons/${hero}.png`)}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    `}
`;

const Ban = ({ hero }) => {
    return (
        <BanContainer hero={hero} />
    )
}

export default Ban