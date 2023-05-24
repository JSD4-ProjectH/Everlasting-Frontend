import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Activitycard from "./component/Activitycard";
import Profile from "./component/Profile";
import AddBtn from './component/AddBtn';
import Layout from "./Navbar/Layout";
import DashboardLabel from "./component/DasboardLabel";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from 'react-router-dom'

import TrackBar from "./component/TrackingBar";

function Dashboard() {
  const [run, setRun] = useState(0)
  const [walk, setWalk] = useState(0)
  const [hike, setHike] = useState(0)
  const [bike, setBike] = useState(0)
  const [swim, setSwim] = useState(0)
  const [isStart, setIsStart] = useState(false)
  const [duration, setDuration] = useState('00 : 00 : 00')
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [data, setData] = useState()
  const [isQuick, setIsQuick] = useState(false)
  const navigation = useNavigate()

  const handleStart = () => {
    setIsStart(prev => !prev)
    const time = new Date()
    const y = time.getFullYear()
    const M = (time.getMonth()+1).toString().padStart(2, '0')
    const d = time.getDate()
    const h = time.getHours()
    const m = time.getMinutes()
    setStartTime(`${y}-${M}-${d}T${h}:${m}`)
    const start = new Date().getTime()
    setInterval(()=>{
    let h = '00'
    let m = '00'
    let s = '00'
    const currentTime = new Date().getTime()
    let diff = currentTime- start
    if(diff/3600000 > 1){
      h = (Math.floor(diff / 3600000)).toString().padStart(2, '0')
      diff = diff % (h * 3600000)
    }
    if(diff/60000 > 1){
      m = (Math.floor(diff / 60000)).toString().padStart(2, '0')
      diff %= (m * 60000)
    }
    if(diff/1000 >= 1){
      s = (Math.floor(diff / 1000)).toString().padStart(2, '0')
    }
    setDuration(`${h} : ${m} : ${s}`)
  },1000)
  }

  const handleEnd = () => {
    const time = new Date()
    const y = time.getFullYear()
    const M = (time.getMonth()+1).toString().padStart(2, '0')
    const d = time.getDate()
    const h = time.getHours()
    const m = time.getMinutes()
    setEndTime(`${y}-${M}-${d}T${h}:${m}`)
    const stoptime = duration
    Swal.fire({
      title: 'Do you want to stop activity?',
      text: `workout time : ${stoptime}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, stop activity'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsQuick(true)
      }
    })
  }

  useEffect(()=>{
    setData(`${isQuick},${startTime},${endTime}`)
  }, [isQuick])

  useEffect(()=>{
    if(isStart){
      navigation(`/AddActivity/${data}`)
    }else{
    }
  }, [data])

  return (
    <Layout>
    <Container fluid className="bigcontainer">
      <Row>
      <AddBtn />
        <Col className="d-none d-md-block profile" md={3} xl={2}>
            <Profile />
        </Col>
        <Col className="dashboard"  sm={12} md={9} xl={10}>
          <DashboardLabel />
            <TrackBar 
              run={run} 
              walk={walk} 
              bike={bike} 
              hike={hike} 
              swim={swim} 
              handleStart={handleStart} 
              handleEnd={handleEnd} 
              isStart={isStart} 
              duration={duration}
            />
            <Activitycard 
              setRun={setRun} 
              setWalk={setWalk} 
              setBike={setBike} 
              setHike={setHike} 
              setSwim={setSwim} 
            />
        </Col>
      </Row>
    </Container>
    </Layout>
  );
}

export default Dashboard;