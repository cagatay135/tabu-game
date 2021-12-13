import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import logo from './logo.png';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'


function App() {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [ timecount, setTimeCount ] = useState(30); 
  const [teama, setTeama] = useState("");
  const [teamb, setTeamb] = useState("");
  const [tourcount, setTourcount] = useState("1");
  return (
    <div className="container h-100">
      <div className="row align-items-center h-100">
        <div className="col-md-12 my-auto py-5">
         <img src={logo} alt="Logo" style={{width:"50%"}} className="text-center" class="center"/>
         <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom04">
        <h6 className="text-white text-left mt-4"><strong>Takım 1</strong></h6>
          <Form.Control className="form-control bg-transparent input-items" style={{color:"white"}} type="text" placeholder="Enter Team Name..." required onChange={e => setTeama(e.target.value)} />
          <Form.Control.Feedback type="invalid" style={{color:"white"}}>
          Please provide a valid team.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom05">
        <h6 className="text-white text-left mt-4"><strong>Takım 2</strong></h6>
        <Form.Control className="form-control bg-transparent input-items" style={{color:"white"}} type="text" placeholder="Enter Team Name..." required onChange={e => setTeamb(e.target.value)} />
          <Form.Control.Feedback type="invalid" style={{color:"white"}}> 
            Please provide a valid team.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom05">
        <h6 className="text-white text-left mt-4"><strong>Time</strong></h6>
        <div className="form-control bg-transparent">
        <Form.Group as={Row}>
        <Col xs="9" lg="11" sm="10">
          <RangeSlider
               value={timecount}
               min={1}
               max={120}
               step={5}
               tooltip='off'
               variant="danger"
               onChange={changeEvent => setTimeCount(changeEvent.target.value)}
          />
        </Col>
        <Form.Label lg="1" column xs="3" sm="2" style={{color:"white"}}>
          <b>{timecount} sec</b>
        </Form.Label>
      </Form.Group>
      </div>

        </Form.Group>
        <Form.Group>
        <h6 className="text-white text-left mt-4"><strong>Tour Count</strong></h6>
          <select id="deneme" default="1" onChange={e => setTourcount(e.target.value)} class="form-control" style={{background:"transparent" , color:"white"}} required id="exampleFormControlSelect1">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </Form.Group>


      </Row>
      <div className="text-center mt-5">
      {teama && teamb && tourcount && teama !== teamb ? (
        <Link to="/game" style={{'text-decoration':'none'}}   state={{ teamaname: teama, teambname:teamb, tour:tourcount, timecount:timecount}}>
        <Button type="submit" className="btn btn-success btn-lg btn-block">
          Start Game
        </Button>
      </Link>
      ) : (
        <Button type="submit" className="btn btn-success btn-lg btn-block">
          Start Game
      </Button>
      )}
      </div>
    </Form>
    </div>
    </div>
    </div>
  )
}

export default App
