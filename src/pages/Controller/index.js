import React, { useState, useEffect } from 'react';
import openSocket from "socket.io-client";
import * as colors from "../../colors";
import { SEQUENCE, InitialTeamInfos, InitialPicksAndBans } from '../../constants';
import {
  Input,
  Button,
  LockInButton,
  TopSection,
  MiddleSection,
  BottomSection,
  ControllerContainer,
  TeamInfosContainer,
  PicksContainer,
  BansContainer,
  SelectionContainer,
  Options,
  UnorderedList,
  ListItem,
  HeroesContainer,
  HeroesWrapper,
  MatchInfoContainer,
  ButtonsContainer,
} from './controller.elements';
import Pick from './Pick';
import Ban from './Ban';
import Hero from './Hero';

const socket = openSocket("http://localhost:5000", {
  transports: ["websocket"],
});

const Controller = () => {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState("");
  const [filter, setFilter] = useState("");
  const [heroes, setHeroes] = useState([]);
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
    fetch("heroes.json")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setHeroes(json.heroes);
      })
      .catch((error) => {
        console.log(error);
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
  }, [counter, phase])

  const swapChampions = (team, fromItem, toItem) => {
    setPicksAndBans(previousPicksAndBans => {
      let newPicksAndBans = Object.assign({}, previousPicksAndBans);
      [newPicksAndBans[team]['picks'][fromItem.index], newPicksAndBans[team]['picks'][toItem.index]] = [newPicksAndBans[team]['picks'][toItem.index], newPicksAndBans[team]['picks'][fromItem.index]]
      socket.emit("sendPicksAndBans", newPicksAndBans);
      return newPicksAndBans;
    })
  };

  const handleDragStart = (event) => {
    let fromItem = JSON.stringify({ index: event.currentTarget.slot });
    event.dataTransfer.setData("dragContent", fromItem);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    return false;
  };

  const handleDrop = (event, team) => {
    event.preventDefault();

    let fromItem = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toItem = { index: event.currentTarget.slot };

    swapChampions(team, fromItem, toItem);
    return false;
  };

  const handleTeamInfosChange = (e, team) => {
    setTeamInfos(previousTeamInfos => {
      previousTeamInfos[team][e.target.name] = e.target.value;
      return previousTeamInfos;
    })
  }

  const handleMatchInfoChange = (e) => {
    setMatchInfo(previousMatchInfo => {
      previousMatchInfo[e.target.name] = e.target.value;
      return previousMatchInfo;
    })
  }

  const handleHeroOnClick = (name) => {
    const team = SEQUENCE[counter];
    const type = (phase === "BAN PHASE 1" || phase === "BAN PHASE 2") ? 'bans' : 'picks';
    const index = picksAndBans[team][type === "bans" ? "bansCount" : "picksCount"];

    setPicksAndBans((previousPicksAndBans) => {
      let newPicksAndBans = Object.assign({}, previousPicksAndBans);

      newPicksAndBans[team][type][index] = name;
      socket.emit("sendPicksAndBans", newPicksAndBans);
      return newPicksAndBans;
    })
  }

  const handleLockIn = () => {
    const team = SEQUENCE[counter];
    const type = (phase === "BAN PHASE 1" || phase === "BAN PHASE 2") ? 'bans' : 'picks';
    const index = picksAndBans[team][type === "bans" ? "bansCount" : "picksCount"];

    if (picksAndBans[team][type][index] === '') {
      alert("You must pick a hero before locking in.")
    } else {
      setCounter(counter + 1);
      setHeroes(prevHeroes => {
        let newHeroes = prevHeroes.filter((hero) => {
          return hero.name !== picksAndBans[team][type][index];
        })

        return newHeroes;
      })
      setPicksAndBans((previousPicksAndBans) => {
        let newPicksAndBans = Object.assign({}, previousPicksAndBans);

        newPicksAndBans[team][type === "bans" ? "bansCount" : "picksCount"]++;
        socket.emit("sendPicksAndBans", newPicksAndBans);
        return newPicksAndBans;
      })
    }
  }

  const handleSwapTeam = () => {
    setTeamInfos(prevTeamInfos => {
      let newTeamInfos = Object.assign({}, prevTeamInfos);
      [newTeamInfos.blue, newTeamInfos.red] = [newTeamInfos.red, newTeamInfos.blue]
      socket.emit(newTeamInfos);
      return newTeamInfos;
    })
  }

  const handleClearTeamInfos = () => {
    setTeamInfos({
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
    });
    socket.emit("sendTeamInfos", {
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
    });
  }

  const handleClearPicksAndBans = () => {
    setPicksAndBans({
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
    });
    setCounter(0);
    socket.emit("sendPicksAndBans", {
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
    });
  }

  const handlePlayerNameChange = (e, team, index) => {
    setTeamInfos(prevTeamInfos => {
      let newTeamInfos = Object.assign({}, prevTeamInfos);

      newTeamInfos[team]['players'][index] = e.target.value;
      return newTeamInfos;
    })
  }

  const handleTeamInfosBlur = () => {
    socket.emit("sendTeamInfos", teamInfos);
  }

  const handleMatchInfoBlur = () => {
    socket.emit("sendMatchInfo", matchInfo);
  }

  return (
    <ControllerContainer>
      <TopSection>
        <TeamInfosContainer backgroundColor={colors.blue}>
          <Input name="teamInitials" placeholder="Team Initials" onChange={(e) => handleTeamInfosChange(e, "blue")} onBlur={handleTeamInfosBlur} />
          <Input name="teamName" placeholder="Team Name" onChange={(e) => handleTeamInfosChange(e, "blue")} onBlur={handleTeamInfosBlur} />
          <Input name="score" type="number" placeholder="Score" onChange={(e) => handleTeamInfosChange(e, "blue")} onBlur={handleTeamInfosBlur} />
        </TeamInfosContainer>

        <MatchInfoContainer>
          <Input name="round" placeholder="Round" onChange={(e) => handleMatchInfoChange(e)} onBlur={handleMatchInfoBlur} />
          <Input name="game" placeholder="Game #" onChange={(e) => handleMatchInfoChange(e)} onBlur={handleMatchInfoBlur} />
        </MatchInfoContainer>

        <TeamInfosContainer backgroundColor={colors.red}>
          <Input name="teamInitials" placeholder="Team Initials" onChange={(e) => handleTeamInfosChange(e, "red")} onBlur={handleTeamInfosBlur} />
          <Input name="teamName" placeholder="Team Name" onChange={(e) => handleTeamInfosChange(e, "red")} onBlur={handleTeamInfosBlur} />
          <Input name="score" type="number" placeholder="Score" onChange={(e) => handleTeamInfosChange(e, "red")} onBlur={handleTeamInfosBlur} />
        </TeamInfosContainer>
      </TopSection>

      <MiddleSection>
        <PicksContainer>
          {picksAndBans.blue.picks.map((item, index) => {
            return (
              <Pick
                key={`blue-pick-${index}`}
                index={index}
                team="blue"
                hero={item}
                IGN={teamInfos.blue.players[index]}
                handlePlayerNameChange={(e) => { handlePlayerNameChange(e, 'blue', index) }}
                handleTeamInfosBlur={handleTeamInfosBlur}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            )
          })}
        </PicksContainer>

        <SelectionContainer>
          <Options>
            <UnorderedList>
              <ListItem onClick={() => setFilter(filter === "tank" ? "" : "tank")}>Tank</ListItem>
              <ListItem onClick={() => setFilter(filter === "fighter" ? "" : "fighter")}>Fighter</ListItem>
              <ListItem onClick={() => setFilter(filter === "assassin" ? "" : "assassin")}>Assassin</ListItem>
              <ListItem onClick={() => setFilter(filter === "mage" ? "" : "mage")}>Mage</ListItem>
              <ListItem onClick={() => setFilter(filter === "marksman" ? "" : "marksman")}>Marksman</ListItem>
              <ListItem onClick={() => setFilter(filter === "support" ? "" : "support")}>Support</ListItem>
              <ListItem>
                <Input
                  id="filter"
                  name="filter"
                  type="text"
                  value={filter}
                  placeholder="Search..."
                  onChange={(event) => setFilter(event.target.value)}
                />
              </ListItem>
            </UnorderedList>
          </Options>

          <HeroesContainer>
            <HeroesWrapper>
              {heroes.filter(
                (item) =>
                  item.name.toLowerCase().includes(filter.toLowerCase()) ||
                  item.role.toLowerCase().includes(filter.toLowerCase()) ||
                  filter === ""
              ).map((item, index) => {
                return (
                  <Hero key={item.name} hero={item.name} handleHeroOnClick={handleHeroOnClick} />
                )
              })}
            </HeroesWrapper>
          </HeroesContainer>
        </SelectionContainer>

        <PicksContainer direction="rtl">
          {picksAndBans.red.picks.map((item, index) => {
            return (
              <Pick
                key={`red-pick-${index}`}
                index={index}
                team="red"
                hero={item}
                IGN={teamInfos.red.players[index]}
                handlePlayerNameChange={(e) => { handlePlayerNameChange(e, 'red', index) }}
                handleTeamInfosBlur={handleTeamInfosBlur}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            )
          })}
        </PicksContainer>
      </MiddleSection>

      <BottomSection>
        <BansContainer>
          {picksAndBans.blue.bans.map((item, index) => {
            return (
              <Ban key={`blue-ban-${index}`} hero={item} />
            )
          })}
        </BansContainer>

        <ButtonsContainer>
          <LockInButton onClick={handleLockIn} disabled={counter > 15}>LOCK IN</LockInButton>
          <Button onClick={handleSwapTeam}>SWAP TEAM</Button>
          <Button onClick={handleClearPicksAndBans}>CLEAR PICKS & BANS</Button>
          <Button onClick={handleClearTeamInfos}>CLEAR TEAM INFOS</Button>
        </ButtonsContainer>

        <BansContainer direction="rtl">
          {picksAndBans.red.bans.map((item, index) => {
            return (
              <Ban key={`red-ban-${index}`} hero={item} />
            )
          })}
        </BansContainer>
      </BottomSection>
    </ControllerContainer>
  )
}

export default Controller