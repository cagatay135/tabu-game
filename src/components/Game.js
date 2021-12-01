import {useLocation} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Modal } from "react-bootstrap";
import {Link} from 'react-router-dom'

const db = require('./word.json');

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
    backdrop="static"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props.currenttour == props.tour && props.playerteam === props.teambname ? (
        null
      ) : (
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-hcenter">
          <b>Tur {props.currenttour} Sonuçlar</b>
        </Modal.Title>
        </Modal.Header>
      )}
      {props.currenttour == props.tour && props.playerteam === props.teambname ? (
        <Modal.Body className="text-center">
        <h4><b>Genel Sonuçlar</b></h4>
        <img src="https://cdn-icons-png.flaticon.com/512/1462/1462412.png" width="100px" class="mt-3 mb-3"/>
        <h4><b>{props.teamascore} - {props.teambscore}</b></h4>
        <h4><b>Kazanan Takım</b></h4>
        {props.teamascore > props.teambscore ? (
          <h4><b>{props.teamaname}</b></h4>
        ) : props.teamascore === props.teambscore ? 
        (
        <h4><b>Berabere</b></h4>
        ) : (
        <h4><b>{props.teambname}</b></h4>)
        }
        </Modal.Body>
      ) : (
        <Modal.Body>
        <div class="strike">
        <h4 className="text-center"><b>Team {props.playerteam}</b></h4>

        </div>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col"><b>Pas</b></th>
              <th scope="col"><b>Tabu</b></th>
              <th scope="col"><b>Doğru</b></th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <th scope="col">
                <b>{props.playerteam == props.teamaname ? props.tourpassteama : props.tourpassteamb}</b>
              </th>
              <th scope="col">
                <b>{props.playerteam == props.teamaname ? props.tourtabooteama : props.tourtabooteamb}</b>
              </th>
              <th scope="col">
               <b>{props.playerteam == props.teamaname ? props.tourpointteama : props.tourpointteamb}</b>
              </th>
            </tr>

          </tbody>
        </table>
        </Modal.Body>
      )}
      {props.currenttour == props.tour && props.playerteam === props.teambname ? (

        <Modal.Footer className="w-100">
        <Link to="/"  className="btn btn-block w-100" style={{'text-decoration':'none'}}>
        <Button className="btn btn-danger w-100" onClick={() => props.onGameOver()}><b>Ana Sayfa</b></Button>
        </Link>
        </Modal.Footer>
      ) : (
        <Modal.Footer>
        <Button className="btn btn-block w-100" onClick={() => { 
          props.playerteam == props.teamaname ? props.settourpointteama(0) : props.settourpointteamb(0);
          props.playerteam == props.teamaname ? props.settourpassteama(0) : props.settourpassteamb(0);
          props.playerteam == props.teamaname ? props.settourtabooteama(0) : props.settourtabooteamb(0);
          props.onHide();
      }}><b>Başlat</b></Button>
      </Modal.Footer>
      )}
    </Modal>
  );
}


function Game({history}) {
  const [teamascore, Setteamascore] = useState(0)
  const [teambscore, Setteambscore] = useState(0)
  const [randomquestion, Setrandomquestion] = useState(0)
  const [modalShow, setModalShow] = useState(false);
  const [key, setKey] = useState(0);
  const [isplay, setIsplay] = useState(true);
  const [tourpointteama, settourpointteama] = useState(0);
  const [tourpointteamb, settourpointteamb] = useState(0);
  const [tourtabooteama, settourtabooteama] = useState(0);
  const [tourtabooteamb, settourtabooteamb] = useState(0);
  const [tourpassteama, settourpassteama] = useState(0);
  const [tourpassteamb, settourpassteamb] = useState(0);

  const location = useLocation()
  const { teamaname, teambname, tour, timecount } = location.state
  const [playerteam, setPlayerTeam] = useState(teamaname);
  const [currenttour , setCurrenttour] = useState(1)

  const [allquestion, setAllquestion] = useState([])
  useState(() => {
    Setrandomquestion(Math.floor(Math.random() * db.length))
  }, [])
  console.log(randomquestion)

  const addpointa = () => {
    Setteamascore(teamascore + 1)
    settourpointteama(tourpointteama + 1)
    nextQuestion()
  }

  const subtractpointa = () => {
    Setteamascore(teamascore - 1)
    settourtabooteama(tourtabooteama + 1)
    nextQuestion()
  }

  const addpointb = () => {
    Setteambscore(teambscore + 1)
    settourpointteamb(tourpointteamb + 1)
    nextQuestion()
  }

  const subtractpointb = () => {
    Setteambscore(teambscore - 1)
    settourtabooteamb(tourtabooteamb + 1)
    nextQuestion()
  }

  const nextQuestion = () => {
    Setrandomquestion(Math.floor(Math.random() * db.length))
  }

  return (
    <div className="container text-center">
        <div className="row">
        <div className="col-md-12 p-3 text-white">
          <h1 className="float-start">Team {playerteam}<br></br>{playerteam===teamaname ? teamascore : teambscore}</h1>
          <h1 className="float-end">
          <button className="btn btn-light btn-lg m-1" style={{alignSelf:"center"}} onClick={() => setIsplay(!isplay)}>
              {isplay ? <i class="bi bi-pause-fill"> Mola</i>  : <i class="bi bi-play-fill">Devam</i>}
            </button>
          </h1>
          <div className="timer-wrapper">
            <CountdownCircleTimer
              isPlaying={isplay}
              key={key}
              size={100}
              duration={1*timecount}
              colors={[["#E67065", 1]]}
              onComplete={() => {
                  setModalShow(true);
              }}
            >
             {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>
            </div>
        <h1 className="text-white">Mevcut Tur 
        <br>
        </br>{currenttour}/{tour}</h1>
        <div className="d-flex justify-content-center mt-4">
        <div className="row mt-2 mb-5 w-75 justify-content-center">
          <div className="col-md-6 col-lg-6  p-0 border-0 rounded" style={{background:"#FFFFFF",color:"#F05E56"}} id="card">
            <div style={{background:"#E67065",color:"white"}} className="card-header">
            <h1 className="display-4 font-weight-bold text-white mb-3"><strong>{db[randomquestion].word}</strong></h1>
            </div>
            <div>
            <hr style={{color:"white"}}></hr>
            <strong className="text-black font-weight-bold mt-3">{db[randomquestion].taboo[0]}</strong>
            <hr style={{color:"white"}}></hr>
            <strong className="text-black font-weight-bold mt-3">{db[randomquestion].taboo[1]}</strong>
            <hr style={{color:"white"}}></hr>
            <strong className="text-black font-weight-italic mt-3">{db[randomquestion].taboo[2]}</strong>
            <hr style={{color:"white"}}></hr>
            <strong className="text-black font-weight-bold mt-3">{db[randomquestion].taboo[3]}</strong>
            <hr style={{color:"white"}}></hr>
            <strong className="text-black font-weight-bold mt-3">{db[randomquestion].taboo[4]}</strong>
            <hr style={{color:"white"}}></hr>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 mt-5 mt-auto mx-auto mb-5">
            <br></br>
            <button className="btn btn-warning btn-lg btn-block mx-1 text-white p-2" style={{width:"30%"}} onClick={() => { 
              if(playerteam === teamaname && tourpassteama < 3){
                nextQuestion()
                playerteam === teamaname ? settourpassteama(tourpassteama+1) : settourpassteamb(tourpassteamb+1)
              }
              else if(playerteam === teambname && tourpassteamb < 3){
                nextQuestion()
                playerteam === teamaname ? settourpassteama(tourpassteama+1) : settourpassteamb(tourpassteamb+1)
              }
            }}>Pas ({3- (playerteam==teamaname? tourpassteama : tourpassteamb)})</button>
            <button className="btn btn-danger btn-lg btn-block mx-1" style={{width:"30%"}} onClick={playerteam===teamaname ?  subtractpointa : subtractpointb}>Tabu</button>
            <button className="btn btn-success btn-lg btn-block mx-1" style={{width:"30%"}}  onClick={playerteam===teamaname ? addpointa : addpointb}>Doğru</button>
            <MyVerticallyCenteredModal
              teamaname={teamaname}
              teamascore={teamascore}
              teambname={teambname}
              teambscore={teambscore}
              playerteam={playerteam}
              teamaname={teamaname}
              teambname={teambname}
              tourpassteama={tourpassteama}
              tourpassteamb={tourpassteamb}
              tourpointteama={tourpointteama}
              tourpointteamb={tourpointteamb}
              tourtabooteama={tourtabooteama}
              tourtabooteamb={tourtabooteamb}
              settourpointteama={settourpointteama}
              settourpointteamb={settourpointteamb}
              settourpassteama={settourpassteama}
              settourpassteamb={settourpassteamb}
              settourtabooteama={settourtabooteama}
              settourtabooteamb={settourtabooteamb}
              currenttour={currenttour}
              tour={tour}
              show={modalShow}
              setIsplay={setIsplay}
              onHide={async () => 
              {
                await setModalShow(false)
                setKey(prevKey => prevKey + 1)
                playerteam===teambname ? setCurrenttour(currenttour + 1) : setCurrenttour(currenttour)
                setPlayerTeam(playerteam === teamaname ? teambname : teamaname)
                

                }
              }
              onGameOver={() => 
                {
                  setModalShow(false)
                  setPlayerTeam(playerteam === teamaname ? teambname : teamaname)
                  setIsplay(false)
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
