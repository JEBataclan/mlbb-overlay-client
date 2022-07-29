import React, { useState, useEffect } from 'react'
import openSocket from "socket.io-client";
import { SEQUENCE } from '../../constants';
import {
  OverlayContainer,
  TeamInfosContainer,
  TeamInfosWrapper,
  TeamInitials,
  TeamNameContainer,
  TeamName,
  MatchInfoContainer,
  MatchInfoWrapper,
  ScoresContainer,
  ScoreContainer,
  Score,
  MatchInfos,
  Timer,
  Round,
  Game,
  PicksContainer,
  BansHeader,
  BansContainer,
  TestContainer,
} from "./overlay.elements"
import Pick from "./Pick";
import Ban from "./Ban";

const socket = openSocket("http://localhost:5000", {
  transports: ["websocket"],
});


const Overlay = () => {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState("BAN PHASE 1");
  const [teamInfos, setTeamInfos] = useState({
    blue: {
      teamName: "",
      teamInitials: "",
      score: 0,
      players: ['', '', '', '', ''],
    },
    red: {
      teamName: "",
      teamInitials: "",
      score: 0,
      players: ['', '', '', '', ''],
    }
  })
  const [matchInfo, setMatchInfo] = useState({
    round: "",
    game: "",
  })
  const [picksAndBans, setPicksAndBans] = useState({
    blue: {
      picks: ['', '', '', '', ''],
      picksCount: 0,
      bans: ['', '', ''],
      bansCount: 0,
    },
    red: {
      picks: ['', '', '', '', ''],
      picksCount: 0,
      bans: ['', '', ''],
      bansCount: 0,
    }
  })

  useEffect(() => {
    socket.on("receivePhaseAndCounter", ({ counter, phase }) => {
      setCounter(counter);
      setPhase(phase);
    })

    socket.on("receiveTeamInfos", (teamInfos) => {
      setTeamInfos(teamInfos);
    })

    socket.on("receiveMatchInfo", (matchInfo) => {
      setMatchInfo(matchInfo);
    })

    socket.on("receivePicksAndBans", (picksAndBans) => {
      setPicksAndBans(picksAndBans);
    })
  }, [])

  return (
    <OverlayContainer>
      <TeamInfosContainer team="blue">
        <TeamInfosWrapper>
          <TeamInitials>{teamInfos.blue.teamInitials}</TeamInitials>
          <TeamNameContainer team="blue">
            <TeamName>{teamInfos.blue.teamName}</TeamName>
          </TeamNameContainer>
        </TeamInfosWrapper>
      </TeamInfosContainer>

      <MatchInfoContainer>
        <MatchInfoWrapper>
          <ScoresContainer>
            <ScoreContainer team="blue"><Score>{teamInfos.blue.score}</Score></ScoreContainer>
            <ScoreContainer team="red"><Score>{teamInfos.red.score}</Score></ScoreContainer>
          </ScoresContainer>
          <MatchInfos>
            <Round>{matchInfo.round}</Round>
            <Game>{matchInfo.game}</Game>
          </MatchInfos>
        </MatchInfoWrapper>
      </MatchInfoContainer>

      <TeamInfosContainer team="red">
        <TeamInfosWrapper>
          <TeamInitials>{teamInfos.red.teamInitials}</TeamInitials>
          <TeamNameContainer team="red">
            <TeamName>{teamInfos.red.teamName}</TeamName>
          </TeamNameContainer>
        </TeamInfosWrapper>
      </TeamInfosContainer>

      <PicksContainer team="blue">
        {picksAndBans.blue.picks.map((item, index) => {
          return (
            <Pick
              key={`blue-pick-${index}`}
              hero={item}
              team="blue"
              playerName={teamInfos.blue.players[index]}
              active={picksAndBans.blue.picksCount === index && SEQUENCE[counter] === 'blue' && (phase === "PICK PHASE 1" || phase === "PICK PHASE 2")}
            />
          )
        })}
      </PicksContainer>

      <BansHeader team="blue">BANS</BansHeader>
      <BansContainer team="blue">
        {picksAndBans.blue.bans.map((item, index) => {
          return (
            <Ban
              key={`blue-ban-${index}`}
              hero={item}
              team="blue"
              active={picksAndBans.blue.bansCount === index && SEQUENCE[counter] === 'blue' && (phase === "BAN PHASE 1" || phase === "BAN PHASE 2")}
            />
          )
        })}
      </BansContainer>

      <PicksContainer team="red">
        {picksAndBans.red.picks.map((item, index) => {
          return (
            <Pick
              key={`red-pick-${index}`}
              hero={item}
              team="red"
              playerName={teamInfos.red.players[index]}
              active={picksAndBans.red.picksCount === index && SEQUENCE[counter] === 'red' && (phase === "PICK PHASE 1" || phase === "PICK PHASE 2")}
            />
          )
        })}
      </PicksContainer>

      <BansHeader team="red">BANS</BansHeader>
      <BansContainer team="red">
        {picksAndBans.red.bans.map((item, index) => {
          return (
            <Ban
              key={`red-ban-${index}`}
              hero={item}
              team="red"
              active={picksAndBans.red.bansCount === index && SEQUENCE[counter] === 'red' && (phase === "BAN PHASE 1" || phase === "BAN PHASE 2")}
            />
          )
        })}
      </BansContainer>
    </OverlayContainer>
  )
}

export default Overlay