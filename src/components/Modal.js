import React from 'react'
import { Modal } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
      style={{
        display: "none",
      }}
      backdrop="static"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {props.gameData.currenttour === props.tour && props.gameData.playerteam === props.teamdata.teambname ? (
          null
        ) : (
          <Modal.Header >
          <Modal.Title id="contained-modal-title-hcenter">
            <b>Tour {props.gameData.currenttour} Scores</b>
          </Modal.Title>
          </Modal.Header>
        )}

        {props.gameData.currenttour == props.tour && props.gameData.playerteam === props.teamdata.teambname ? (
          <Modal.Body className="text-center">
          <h4><b>Total Scores</b></h4>
          <img src="https://cdn-icons-png.flaticon.com/512/1462/1462412.png" alt="" width="100px" class="mt-3 mb-3"/>
          <h4><b>{props.teamdata.teamascore} - {props.teamdata.teambscore}</b></h4>
          <h4><b>Winner Team</b></h4>
          {props.teamdata.teamascore > props.teamdata.teambscore ? (
            <h4><b>{props.teamdata.teamaname}</b></h4>
          ) : props.teamdata.teamascore === props.teamdata.teambscore ? 
          (
          <h4><b>Draw</b></h4>
          ) : (
          <h4><b>{props.teamdata.teambname}</b></h4>)
          }
          </Modal.Body>
        ) : (
          <Modal.Body>
          <div class="strike">
          <h4 className="text-center"><b>Team {props.gameData.playerteam}</b></h4>
  
          </div>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th scope="col"><b>Pass</b></th>
                <th scope="col"><b>Taboo</b></th>
                <th scope="col"><b>Correct</b></th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="col">
                  <b>{props.gameData.playerteam === props.teamdata.teamaname ? props.teamdata.tourpassteama : props.teamdata.tourpassteamb}</b>
                </th>
                <th scope="col">
                  <b>{props.gameData.playerteam === props.teamdata.teamaname ? props.teamdata.tourtabooteama : props.teamdata.tourtabooteamb}</b>
                </th>
                <th scope="col">
                 <b>{props.gameData.playerteam === props.teamdata.teamaname ? props.teamdata.tourpointteama : props.teamdata.tourpointteamb}</b>
                </th>
              </tr>
  
            </tbody>
          </table>
          </Modal.Body>
        )}
        {props.gameData.currenttour == props.tour && props.gameData.playerteam === props.teamdata.teambname ? (
  
          <Modal.Footer className="w-100">
          <Link to="/"  className="btn btn-block w-100" style={{'text-decoration':'none'}}>
          <Button className="btn btn-danger w-100" onClick={() => props.onGameOver()}><b>Main Menu</b></Button>
          </Link>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
          <Button className="btn btn-block w-100" onClick={() => { 
            props.gameData.playerteam === props.teamdata.teamaname ? props.setTeamData({
                ...props.teamdata,
                tourpointteama: 0,
                tourpassteama : 0,
                tourtabooteama : 0
            }) : props.setTeamData({
                ...props.teamdata,
                tourpointteamb: 0,
                tourpassteamb : 0,
                tourtabooteamb : 0
            })
            props.onHide();
          }}>
        
        <b>Start</b></Button>
        </Modal.Footer>
        )}
      </Modal>
    );
}
  

export default MyVerticallyCenteredModal
