import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [teama, setTeama] = useState("");
  const [teamb, setTeamb] = useState("");
  const [tourcount, setTourcount] = useState("1");
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <br/>
          <h1 className="text-white">Takım 1</h1>
          <input type="text" required className="form-control bg-transparent input-items" style={{color:"white"}} placeholder="A Takımı" onChange={e => setTeama(e.target.value)}/>
          <br/>
          <h1 className="text-white">Takım 2</h1>
          <input id="denemex" type="text" required className="form-control bg-transparent  input-items" style={{color:"white"}} placeholder="B Takımı" onChange={e => setTeamb(e.target.value)}/>
          <br></br>
          <h1 className="text-white">Tur Sayısı</h1>
          <select id="deneme" default="1" onChange={e => setTourcount(e.target.value)} class="form-control" style={{background:"transparent" , color:"white"}} required id="exampleFormControlSelect1">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
    </div>
    <div class="row">
    <div class="col md-12 mt-5">
      <div className="text-center">
      {teama && teamb && tourcount ? (
        <Link to="/game" style={{'text-decoration':'none'}}   state={{ teamaname: teama, teambname:teamb, tour:tourcount}}>
        <button className="btn btn-success btn-lg btn-block">
          OYUNA BAŞLA
        </button>
      </Link>
      ) : (
        <button className="btn btn-success btn-lg btn-block">
          OYUNA BAŞLA
      </button>
      )}       
      </div>	
    </div>
    </div>
    </div>
  )
}

export default App
