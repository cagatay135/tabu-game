import {useLocation} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {Link} from 'react-router-dom'
import MyVerticallyCenteredModal from "./Modal";
const db = require('./word.json');

function Game({history}) {
  const location = useLocation()
  const { teamaname, teambname, tour, timecount } = location.state
  const [teamdata, setTeamData] = useState(
    {
      teamaname: teamaname,
      teambname: teambname,
      teamascore : 0,
      teambscore : 0,
      tourpointteama : 0,
      tourpointteamb : 0,
      tourtabooteama : 0,
      tourtabooteamb : 0,
      tourpassteama : 0,
      tourpassteamb : 0,
    });

  const [gameData, setGameData] = useState(
    {
      isplay : true,
      key : 0,
      currenttour : 1,
      randomquestion : Math.floor(Math.random() * db.length),
      modalShow : false,
      playerteam : teamaname,
    }
  );

  useState(() => {
    setGameData({...gameData , randomquestion: Math.floor(Math.random() * db.length)})
  }, [])
  console.log(gameData.randomquestion)

  const addpoint = () => {
    gameData.playerteam === teamaname ? 
    setTeamData({
      ...teamdata,
      teamascore: teamdata.teamascore + 1,
      tourpointteama: teamdata.tourpointteama + 1,
    }) :
    setTeamData({
      ...teamdata,
      teambscore: teamdata.teambscore + 1,
      tourpointteamb: teamdata.tourpointteamb + 1,
    })
    nextQuestion()
  }

  const subtractpoint = () => {
    gameData.playerteam === teamaname ? 
    setTeamData
    ({
      ...teamdata,
      teamascore: teamdata.teamascore - 1,
      tourtabooteama: teamdata.tourtabooteama + 1,
    }) :
    setTeamData
    ({
      ...teamdata,
      teambscore: teamdata.teambscore - 1,
      tourtabooteamb: teamdata.tourtabooteamb + 1,
    })
    nextQuestion()
  }

  const nextQuestion = () => {
    setGameData({...gameData , randomquestion: Math.floor(Math.random() * db.length)})
  }

  return (
    <div className="container text-center">
        <div className="row">
        <div className="col-md-12 p-3 text-white">
          <h1 className="float-start">Team {gameData.playerteam}<br></br>{gameData.playerteam===teamaname ? teamdata.teamascore : teamdata.teambscore}</h1>
          <h1 className="float-end">
          <button className="btn btn-light btn-lg" style={{alignSelf:"center"}} onClick={() => setGameData({...gameData , isplay : !gameData.isplay})}>
              {gameData.isplay ? <i class="bi bi-pause-fill"> Break</i>  : <i class="bi bi-play-fill">Continue</i>}
            </button>
          </h1>
          <div className="timer-wrapper">
            <CountdownCircleTimer
              isPlaying={gameData.isplay}
              key={gameData.key}
              size={100}
              duration={1*timecount}
              colors={[["#E67065", 1]]}
              onComplete={() => {
                setGameData({...gameData, modalShow:true})
              }}
            >
             {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>
            </div>
        <h1 className="text-white">Current Tour 
        <br>
        </br>{gameData.currenttour}/{tour}</h1>
        <div className="d-flex justify-content-center mt-4">
        <div className="row mt-2 mb-5 w-75 justify-content-center">
          <div className="col-md-6 col-lg-6  p-0 border-0 rounded" style={{background:"#FFFFFF",color:"#F05E56"}} id="card">
            <div style={{background:"#E67065",color:"white"}} className="card-header">
            <h1 className="display-4 font-weight-bold text-white mb-3"><strong>{db[gameData.randomquestion].word}</strong></h1>
            </div>
            <div>
            <hr style={{color:"white"}}></hr>
            <strong className="text-black font-weight-bold mt-3">{db[gameData.randomquestion].taboo[0]}</strong>
            <hr style={{color:"white"}}></hr>
            <strong className="text-black font-weight-bold mt-3">{db[gameData.randomquestion].taboo[1]}</strong>
            <hr style={{color:"white"}}></hr>
            <strong className="text-black font-weight-italic mt-3">{db[gameData.randomquestion].taboo[2]}</strong>
            <hr style={{color:"white"}}></hr>
            <strong className="text-black font-weight-bold mt-3">{db[gameData.randomquestion].taboo[3]}</strong>
            <hr style={{color:"white"}}></hr>
            <strong className="text-black font-weight-bold mt-3">{db[gameData.randomquestion].taboo[4]}</strong>
            <hr style={{color:"white"}}></hr>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 mt-5 mt-auto mx-auto mb-5 p-0">
            <br></br>
            <button className="btn btn-warning btn-lg btn-block mx-1 text-white p-2 mx-1" style={{width:"30%"}} onClick={() => { 
              if(gameData.playerteam === teamaname && teamdata.tourpassteama < 3){
                nextQuestion()
                gameData.playerteam === teamaname ? setTeamData({...teamdata , tourpassteama : teamdata.tourpassteama + 1}) : setTeamData({...teamdata , tourpassteamb : teamdata.tourpassteamb + 1})
              }
              else if(gameData.playerteam === teamdata.teambname && teamdata.tourpassteamb < 3){
                nextQuestion()
                gameData.playerteam === teamaname ? setTeamData({...teamdata, tourpassteama : teamdata.tourpassteama+1}) : setTeamData({...teamdata, tourpassteamb : teamdata.tourpassteamb+1})
              }
            }}>Pas ({3- (gameData.playerteam==teamaname? teamdata.tourpassteama : teamdata.tourpassteamb)})</button>
            <button className="btn btn-danger btn-lg btn-block p-2 mx-1" style={{width:"30%"}} onClick={subtractpoint}>Taboo</button>
            <button className="btn btn-success btn-lg btn-block p-2 mx-1" style={{width:"30%"}}  onClick={addpoint}>Correct</button>
            <MyVerticallyCenteredModal
              teamaname={teamaname}
              teamdata={teamdata}
              setTeamData={setTeamData}
              teambname={teambname}
              teambname={teambname}
              tour={tour}
              show={gameData.modalShow}
              gameData={gameData}
              onHide={() => 
              {
                setGameData({
                   ...gameData,
                   modalShow: false,
                   key: gameData.key + 1,
                   currenttour: gameData.playerteam===teamdata.teambname ? gameData.currenttour + 1 : gameData.currenttour,
                   playerteam: gameData.playerteam===teamdata.teambname ? teamaname : teambname,
                   randomquestion: Math.floor(Math.random() * db.length)
                  })
                console.log(gameData.playerteam)
              }}
              onGameOver={() => 
                {
                  setGameData({...gameData, modalShow:false})
                  setGameData({...gameData, playerteam : gameData.playerteam === teamdata.teamaname ? teamdata.teambname : teamdata.teamaname})
                  setGameData({...gameData , isplay: false}) 
                  }
                }

            />
            </div>
        </div>
        </div>
     </div>
     </div>
  );
}

export default Game;
