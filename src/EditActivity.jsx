import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar.jsx'
import './EditActivity.css'
import bike_icon from './images/bike_icon.png'
import hike_icon from './images/hike_icon.png'
import run_icon from './images/run_icon.png'
import walk_icon from './images/walk_icon.png'
import swim_icon from './images/swim_icon.png'
import Joi from 'joi'
import { Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import axios from 'axios'
import {useParams,useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"; 
import BACKEND_URL from '../config.js'



function EditActivity() {
  const [isSelect, setIsSelect] = useState('')
  const [editData, setEditData] = useState({activity:"", activityName:"", activityDetail:"", timeStart:"", timeEnd:"", distance:""})
  const [activityError, setActivityError] = useState("")
  const [activityNameError, setActivityNameError] = useState("")
  const [activityDetailError, setActivityDetail] = useState("")
  const [timeStartError, setTimeStartError] = useState("")
  const [timeEndError, setTimeEndError] = useState("")
  const [distanceError, setDistanceError] = useState("")


  const {id} = useParams();
  const NavigateAFTupdate = useNavigate();

  function handlerSelect(selected){
    if(selected===isSelect){
      setIsSelect('')
      setEditData(prev => ({...prev, activity:""}))
    }else{
      setIsSelect(selected)
    }
  }

  useEffect(()=>{
    setEditData(prev => ({...prev, activity:isSelect}))
  }, [isSelect])

  const validateForm = () => {
    setActivityError("")
    setActivityNameError("")
    setActivityDetail("")
    setTimeStartError("")
    setTimeEndError("")
    setDistanceError("")
    const {error, value} = editSchema.validate(editData, { abortEarly: false})
    if(error){
      error.details.forEach(err => {
        if(err.path[0]==='activity'){
          setActivityError("must select a activity by clicking on icon")
        }
      if(err.path[0]==='activityName'){
        setActivityNameError(err.message)
      }
      if(err.path[0]==='activityDetail'){
        setActivityDetail(err.message)
      }
      if(err.path[0]==='timeStart'){
        setTimeStartError(err.message)
      }
      if(err.path[0]==='timeEnd'){
        setTimeEndError(err.message)
      }
      if(err.path[0]==='distance'){
        setDistanceError(err.message)
      }
    })}
  }
  
  useEffect(validateForm, [editData])

  function handlerChange(e){
    const name = e.target.name
    const value = e.target.value
    setEditData(prev=>({...prev, [name]: value}))
  }

  const editSchema = Joi.object({
    activity: Joi.string().required(),
    activityName: Joi.string().min(3).required(),
    activityDetail: Joi.string().min(3).required(),
    timeStart: Joi.string().min(3).required(),
    timeEnd: Joi.string().min(3).required(),
    distance: Joi.string().required(),
  })

  function handlerUpdate(e){
    e.preventDefault()
    const {error, value} = editSchema.validate(editData, { abortEarly: false})
    if(error){
      alert("cannot send form, please fill every input box")
    }else{
      
      const UpdateActivity = async () => {
      try {       
        const token = localStorage.getItem("token");
        

        const UpdateAct = await axios.put(`${BACKEND_URL}/activity/updateactivity/${id}`,
        {
          activityType:editData.activity, 
          activityName:editData.activityName,
          activityDetail:editData.activityDetail, 
          startTime:editData.timeStart, 
          finishTime:editData.timeEnd, 
          distance:editData.distance,
        },
        {headers: {authorization:`Bearer ${token}`}})


        setEditData({})
        setIsSelect("")
        
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          icon: "success",
          title: "Your activity has been updated"
        }).then(() => {
          NavigateAFTupdate("/Dashboard");
        });
      } catch (error) {}
    }
    UpdateActivity();
    }
  }



  useEffect(()=>{
    const fetchEditData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(id);
        const EditData = await axios.get(`${BACKEND_URL}/activity/getactivity/${id}`,{headers: {authorization:`Bearer ${token}`}})
        console.log(EditData);
        setEditData({activity:EditData.data.activityType,  
                    activityName:EditData.data.activityName, 
                    activityDetail:EditData.data.activityDetail, 
                    timeStart:EditData.data.startTime, 
                    timeEnd:EditData.data.finishTime, 
                    distance:EditData.data.distance
                  })

        setIsSelect(EditData.data.activityType)
      } catch (error) {}
    }
    fetchEditData();
  },[])

  /* FOR UPDATE DATA */
  

  return (
     <div>
       <Navbar />
      <div className='EditActivity-page'>
        <div className='EditActivity-formbox'>
          <h2>Edit activity</h2>
          <Swiper
          className='EditActivity-icon'
          modules={[Navigation]}
          navigation={true} 
          spaceBetween={0}
          slidesPerView={3}
          style={{
            "--swiper-pagination-color": "#066c6b",
            "--swiper-navigation-color": "#066c6b",
          }}
          breakpoints={{
            375:{slidesPerView:1},
            760:{slidesPerView:2},
            1040:{slidesPerView:3}
          }}
          >
            <SwiperSlide><button onClick={()=>handlerSelect('Biking')} style={{backgroundColor:isSelect==='Biking'?'#ef4b3f':null}}><img src={bike_icon} /></button></SwiperSlide>
            <SwiperSlide><button onClick={()=>handlerSelect('Hiking')} style={{backgroundColor:isSelect==='Hiking'?'#ef4b3f':null}}><img src={hike_icon}/></button></SwiperSlide>
            <SwiperSlide><button onClick={()=>handlerSelect('Running')} style={{backgroundColor:isSelect==='Running'?'#ef4b3f':null}}><img src={run_icon}/></button></SwiperSlide>
            <SwiperSlide><button onClick={()=>handlerSelect('Walking')} style={{backgroundColor:isSelect==='Walking'?'#ef4b3f':null}}><img src={walk_icon}/></button></SwiperSlide>
            <SwiperSlide><button onClick={()=>handlerSelect('Swimming')} style={{backgroundColor:isSelect==='Swimming'?'#ef4b3f':null}}><img src={swim_icon}/></button></SwiperSlide>
          </Swiper>
          <span><p>selected activity : {isSelect}</p></span>
           <p>{activityError}</p> 
          
          <input type='text' placeholder='Activity Name' name='activityName' value={editData.activityName||""} onChange={handlerChange} style={{backgroundColor:activityNameError&&editData.activityName?"salmon":null}}/>
          <p>{activityNameError&&editData.activityName?activityNameError:""}</p>
          
          <input type='text' placeholder='Activity Detail' name='activityDetail' value={editData.activityDetail||""} onChange={handlerChange} style={{backgroundColor:activityDetailError&&editData.activityDetail?"salmon":null}}/>
          <p>{activityDetailError&&editData.activityDetail?activityDetailError:""}</p>
          
          <input type='datetime-local' placeholder='Time' name='timeStart' value={editData.timeStart||""} onChange={handlerChange} style={{backgroundColor:timeStartError&&editData.timeStart?"salmon":null}}/>
          <p>{timeStartError&&editData.timeStart?timeStartError:""}</p>
          
          <input type='datetime-local' placeholder='Time' name='timeEnd' value={editData.timeEnd||""} onChange={handlerChange} style={{backgroundColor:timeEndError&&editData.timeEnd?"salmon":null}}/>
          <p>{timeEndError&&editData.timeEnd?timeEndError:""}</p>
          
          <input type='number' placeholder='Distance' name='distance' value={editData.distance||""} onChange={handlerChange} style={{backgroundColor:distanceError&&editData.distance?"salmon":null}}/>
          <p>{distanceError&&editData.distance?distanceError:""}</p>
          
          <input type='file' />
          {/* <p></p> */}
          <button onClick={handlerUpdate}>Update</button>
        </div>
      </div>
     </div>
  )
}

export default EditActivity