import styled from "styled-components";

export const Input = styled.input``;

export const Button = styled.button``;

export const Timer = styled.p``;

export const ControllerContainer = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const TopSection = styled.div`
    display: flex;
    width: 100%;
`;

export const MiddleSection = styled.div`
    display: flex;
`;

export const BottomSection = styled.div`
    display: flex;
`;

export const ButtonsContainer = styled.div``;

export const TeamInfosContainer = styled.div`
    background-color: ${({backgroundColor}) => backgroundColor && backgroundColor};
    width: 40%;
`;

export const MatchInfoContainer = styled.div`
    width: 20%;
`;

export const HeroesContainer = styled.div`
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1c1d3f;
`;

export const PicksContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
`;

export const BansContainer = styled.div`
    width: 500px;
    height: 100px;
    direction: ${({ direction }) => direction ? direction : 'ltr'};
    display: flex;
`;

export const HeroesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: #1c1d3f;
`;