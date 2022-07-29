import styled from "styled-components";
import * as colors from "../../colors";

export const OverlayContainer = styled.div`
    width: 1920px;
    height: 1080px;
`;

export const TeamInfosContainer = styled.div`
    position: absolute;
    width: 480px;
    height: 135px;
    top: 0;
    background-color: white;
    ${({ team }) => team === "blue" ? (`
        left: 380px;
        color: ${colors.blue};
        transform: skewX(20deg);
        & > * {
            margin-left: 50px;
            transform: skewX(-20deg);
        }
    `) : (`
        right: 380px;
        direction: rtl;
        color: ${colors.red};
        transform: skewX(-20deg);
        & > * {
            margin-right: 50px;
            transform: skewX(20deg);
        }
    `)}
`;

export const TeamInfosWrapper = styled.div``;

export const TeamInitials = styled.p`
    height: 85px;
    font-size: 60px;
    line-height: 85px;
    font-weight: 900;
`;
export const TeamNameContainer = styled.div`
    height: 50px;
    background-color: ${({ team }) => team === "blue" ? colors.blue : colors.red};
    position: relative;

    ${({ team }) => team === "blue" ? (`
    margin-left: -80px;
    transform: skewX(20deg);
    & > * {
        left: 76px;
        transform: skewX(-20deg) translateY(-50%);
    }
    `) : (`
        margin-right: -80px;
        transform: skewX(-20deg);
        & > * {
            right: 76px;
            transform: skewX(20deg) translateY(-50%);
        }
    `)}
`;
export const TeamName = styled.p`
    color: white;
    font-size: 24px;
    margin: 0;
    position: absolute;
    top: 50%;
    font-weight: 700;
`;

export const Timer = styled.p``;

export const MatchInfoContainer = styled.div`
    position: absolute;
    top: 0px;
    left: 850px;
    border-top: 135px solid white;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    height: 0;
    width: 220px;
    text-align: center;
    color: black;
`;

export const MatchInfoWrapper = styled.div`
    width: 220px;
    transform: translate(-50px, -135px);
`

export const ScoresContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ScoreContainer = styled.div`
    width: 50%;
    text-align: center;
    font-size: 48px;
    line-height: 60px;
    font-weight: 600;
    border-top: 72px solid ${({team}) => team === "blue" ? colors.blue : colors.red};
    ${({team}) => team === "blue" ? `
        border-left: 26px solid transparent;
        border-right: 0 solid transparent;
    ` : `
        border-left: 0 solid transparent;
        border-right: 26px solid transparent;
    `}
    border-bottom: 0 solid transparent;

    & > * {
        transform: translate(${({team}) => team === "blue" ? '-4px' : '4px'}, -68px);
    }
`

export const Score = styled.p`
    color: white;
`;

export const MatchInfos = styled.div`
    transform: translate(0, -52px);
`;
export const Round = styled.div`
    font-size: 20px;
    line-height: 20px;
    font-weight: 700;
`;
export const Game = styled.div`
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
`;

export const PicksContainer = styled.div`
    position: absolute;
    top: 0;
    ${({ team }) => team === "blue" ? (`
        left: 0;
        background-color: ${colors.blue};
        box-shadow: 5px 0 0 #fff;
    `) : (`
        right: 0;
        background-color: ${colors.red};
        box-shadow: -5px 0 0 #fff;
    `)}
    width: 420px;
    height: 900px;

    display: flex;
    flex-direction: column;
`;

export const BansHeader = styled.p`
    position: absolute;
    top: 900px;
    ${({ team }) => team === "blue" ? (`
        left: 0;
        color: ${colors.blue};
        box-shadow: 5px 0 0 #fff;
    `) : (`
        right: 0;
        color: ${colors.red};
        direction: rtl;
        box-shadow: -5px 0 0 #fff;
    `)}
    width: 420px;
    height: 30px;
    background-color: white;
    font-size: 24px;
    font-weight: 600;
    line-height: 30px;
    text-indent: 12px;
`;

export const BansContainer = styled.div`
    position: absolute;
    top: 930px;
    ${({ team }) => team === "blue" ? (`
        left: 0;
        box-shadow: 5px 0 0 #fff;
    `) : (`
        right: 0;
        direction: rtl;
        box-shadow: -5px 0 0 #fff;
    `)}
    width: 420px;
    height: 150px;
    background-color: ${colors.blue};

    display: flex;
`;