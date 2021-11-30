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
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tur {props.currenttour} Sonuçlar
        </Modal.Title>
      </Modal.Header>
      {props.currenttour == props.tour && props.playerteam === props.teambname ? (
        <Modal.Body>
        <h4>Genel Sonuçlar</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">{props.teamaname}</th>
              <th scope="col">{props.teambname}</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <th scope="col">
                {props.teamascore}
              </th>
              <th scope="col">
                {props.teambscore}
              </th>
            </tr>

          </tbody>
        </table>
        </Modal.Body>
      ) : (
        <Modal.Body>
        <h4>Team {props.playerteam} </h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Pas</th>
              <th scope="col">Tabu</th>
              <th scope="col">Doğru</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <th scope="col">
                {props.playerteam == props.teamaname ? props.tourpassteama : props.tourpassteamb}
              </th>
              <th scope="col">
                {props.playerteam == props.teamaname ? props.tourtabooteama : props.tourtabooteamb}
              </th>
              <th scope="col">
              {props.playerteam == props.teamaname ? props.tourpointteama : props.tourpointteamb}
              </th>
            </tr>

          </tbody>
        </table>
        </Modal.Body>
      )}
      {props.currenttour == props.tour && props.playerteam === props.teambname ? (
        <Modal.Footer>
        <Link to="/"  className="btn btn-block w-100" style={{'text-decoration':'none'}}>
        <Button>Ana Sayfa</Button>
        </Link>
        </Modal.Footer>
      ) : (
        <Modal.Footer>
        <Button className="btn btn-block w-100" onClick={() => { 
          props.playerteam == props.teamaname ? props.settourpointteama(0) : props.settourpointteamb(0);
          props.playerteam == props.teamaname ? props.settourpassteama(0) : props.settourpassteamb(0);
          props.playerteam == props.teamaname ? props.settourtabooteama(0) : props.settourtabooteamb(0);
          props.onHide();
      }}>Başlat</Button>
      </Modal.Footer>
      )}
    </Modal>
  );
}


const style = {
  container: {
    display:"flex",
    flexDirection:"row",
    marginTop: '10%',
    
  },
  card : {
    width:"40%",
    justifyContent:"center",
    },
    title : {
      color:"white",
      backgroundColor:"#667994",
      width:"100%",
      padding: "20px",
      textAlign:'center',
      border: "2px solid #667994",
      borderTopLeftRadius: "15px",
      borderTopRightRadius: "15px",
      fontWeight: "bold",
    },
    question : {  
      color:"#484F5C",
      backgroundColor:"#white",
      width:"100%",
      height:"200px",
      padding: "20px",
      border: "2px solid #667994",
      borderBottomLeftRadius: "15px",
      borderBottomRightRadius: "15px",
      textAlign:'center',
      fontWeight: "bold",
      lineHeight: "20px",
      webkitBoxShadow: "5px 5px 30px 0px #657893",
      mozBoxShadow: "5px 5px 30px 0px #657893",
      boxShadow: "5px 5px 30px 0px #657893",
    },
    cardText: {
      color:"white",
    },
    score: {
      "flexDirection": "row",
      "justifyContent": "space-between",
      "display": "flex",
      "margin": "1em 0",
      "width": "50%",
      marginLeft: "7%",


    },
    scorecontainer: {
      "backgroundColor": "#A4B2C9",
      "width": "48%",
      marginLeft: "3%",
    },
    team: {
      "paddingTop": "10px",
      "display": "block",
      fontWeight: "bold",
      textAlign: "center",
    },
    eachscore: {
      "fontFamily": "'Staatliches', cursive",
      "fontSize": "36px",
      "padding": "10px 0px",
      "display": "block",
      fontWeight: "bold",
      textAlign: "center",
    },
    scorebuttons: {
      "marginBottom": "20px",
      fontWeight: "bold",
      textAlign: "center",
    },
    addpoint: {
      "fontSize": "30px",
      "color": "#657893",
      padding:"5px",
      border: "2px solid #667994",

    },
    subtractpoint: {
      "marginRight": "20px",
      "fontSize": "30px",
      "color": "#657893",
      padding:"5px",
      border: "2px solid #667994",

    },
    add_point_hover: {
      "cursor": "pointer",
      "color": "#404654"
    },
    subtract_point_hover: {
      "cursor": "pointer",
      "color": "#404654"
    },
    add_point_active: {
      "transform": "translateY(2px)"
    },
    subtract_point_active: {
      "transform": "translateY(2px)"
    },
    passQuestion: {
      "marginLeft": "20%",
      fontSize: "25px",
      fontWeight: "bold",
    }

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
              duration={timecount}
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
          <div className="col-md-6 col-lg-6  p-0 border border-warning rounded" style={{background:"#FFFFFF",color:"#F05E56"}} id="card">
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
            <button className="btn btn-warning btn-lg btn-block mx-1 text-black" style={{width:"30%"}} onClick={() => { 
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
              onHide={() => 
              {
                setModalShow(false)
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
