import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
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

// https://mlbb-overlay-server.herokuapp.com
// http://localhost:5000/
const socket = openSocket("https://mlbb-overlay-server.herokuapp.com", {
  transports: ["websocket"],
});


const Overlay = () => {
  let { room } = useParams();
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState("BAN PHASE 1");
  const [teamInfos, setTeamInfos] = useState({
    blue: {
      name: "",
      initials: "",
      score: 0,
      players: ['', '', '', '', ''],
    },
    red: {
      name: "",
      initials: "",
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
    //socket.on("receivePhaseAndCounter", ({ counter, phase }) => {
    ////  setCounter(counter);
      setPhase(phase);
    //})

    socket.emit("join-room", room);

    socket.on("receiveCounter", (counter) => {
      setCounter(counter);
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

  useEffect(() => {
    if (counter >= 0 && counter <= 3) {
      setPhase("BAN PHASE 1");
    } else if (counter >= 4 && counter <= 9) {
      setPhase("PICK PHASE 1");
    } else if (counter >= 10 && counter <= 11) {
      setPhase("BAN PHASE 2");
    } else if (counter >= 12 && counter <= 15) {
      setPhase("PICK PHASE 2");
    }

    socket.emit("sendPhaseAndCounter", { counter, phase });
  }, [counter])

  return (
    <OverlayContainer>
      <TeamInfosContainer team="blue">
        <TeamInfosWrapper>
          <TeamInitials>{teamInfos.blue.initials}</TeamInitials>
          <TeamNameContainer team="blue">
            <TeamName>{teamInfos.blue.name}</TeamName>
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
          <TeamInitials>{teamInfos.red.initials}</TeamInitials>
          <TeamNameContainer team="red">
            <TeamName>{teamInfos.red.name}</TeamName>
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