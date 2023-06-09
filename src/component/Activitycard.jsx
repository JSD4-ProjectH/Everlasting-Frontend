import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BACKEND_URL from "../../config.js";
import run from "../images/elder-running.jpeg";
import walk from "../images/elder-walking.jpeg";
import swim from "../images/elder-swimming.jpeg";
import bike from "../images/elder-biking.jpeg";
import hike from "../images/elder-hiking.webp";

const typeIconMap = {
  Running: "fa-person-running",
  Walking: "fa-person-walking",
  Swimming: "fa-person-swimming fa-flip-horizontal",
  Biking: "fa-person-biking",
  Hiking: "fa-person-hiking",
};

const typeImgMap = {
  Running: run,
  Walking: walk,
  Swimming: swim,
  Biking: bike,
  Hiking: hike,
};

function Activitycard({ setRun, setWalk, setHike, setSwim, setBike }) {
  const [card, setCard] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      const token = localStorage.getItem("token");
      const responseData = await axios.get(`${BACKEND_URL}/activity/userdata`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // alert(responseData.data.message)
      setBike(0);
      setHike(0);
      setRun(0);
      setSwim(0);
      setWalk(0);
      setCard([...responseData.data]);
    }
    fetchdata();
    setIsDelete(false);
  }, [isDelete]);

  useEffect(() => {
    card.map((cardd) => {
      if (cardd.activityType === "Biking") {
        setBike((prev) => (prev += 1));
      } else if (cardd.activityType === "Hiking") {
        setHike((prev) => (prev += 1));
      } else if (cardd.activityType === "Running") {
        setRun((prev) => (prev += 1));
      } else if (cardd.activityType === "Walking") {
        setWalk((prev) => (prev += 1));
      } else if (cardd.activityType === "Swimming") {
        setSwim((prev) => (prev += 1));
      }
    });
  }, [card]);

  const deletePost = (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: "warning",
      title: "Are you sure you want to delete?",
      text: "Delete",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BACKEND_URL}/activity/delete/${id}`)
          .then(
            Swal.fire({
              icon: "success",
              title: "Delete Success!!",
              text: "T T",
            })
          )
          .catch((err) => console.log(err));
        setIsDelete(true);
      }
    });
  };

  return (
    <Row className="cardrow">
      {card
        .slice()
        .reverse()
        .map((cardd) => (
          <Card className="activitycard" key={cardd._id}>
            <Card.Img
              variant="top"
              className="activitypic"
              src={`${typeImgMap[cardd.activityType]}`}
            />
            <Card.Body>
              <Card.Title className="cardtitle">
                {cardd.activityName} &nbsp;
                <span className="typetext">{cardd.activityType}&nbsp;</span>
                <i
                  className={`fa-solid ${
                    typeIconMap[cardd.activityType]
                  } fa-2xl actype`}
                  title={cardd.activityType}
                />
              </Card.Title>
              <Card.Text>
                {cardd.activityDetail}{" "}
                {/* <<<<<<<<<<<<<<<Add description here<<<<<<<<<<<<<<< */}
                <br />
                <br />
                <i className="fa-solid fa-calendar-days fa-2xl acdetail"></i>
                &nbsp; &nbsp; Start {cardd.startTime}{" "}
                {/* <<<<<<<<<<<<<<<Add start here<<<<<<<<<<<<<<< */}
                <br />
                <br />
                <i className="fa-solid fa-flag-checkered fa-2xl acdetail"></i>
                &nbsp; &nbsp; End {cardd.finishTime}{" "}
                {/* <<<<<<<<<<<<<<<Add end here<<<<<<<<<<<<<<< */}
                <br />
                <br />
                <i className="fa-solid fa-stopwatch fa-2xl acdetail"></i>
                &nbsp; &nbsp;
                {cardd.duration}{" "}
                {/* <<<<<<<<<<<<<<<Add duration here<<<<<<<<<<<<<<< */}
                <br />
                <br />
                <i className="fa-solid fa-route fa-2xl acdetail"></i>
                &nbsp; &nbsp;
                {cardd.distance}{" "}
                {/* <<<<<<<<<<<<<<<Add distance here<<<<<<<<<<<<<<< */}
                <br />
                <br />
                <br />
              </Card.Text>
              <a href={`/EditActivity/${cardd._id}`}>
                <Button variant="outline-success" className="editactivitybtn">
                  <i className="fa-solid fa-pen-to-square fa-2xl" />
                </Button>
              </a>
              <Button
                onClick={() => deletePost(cardd._id)}
                variant="outline-danger"
                className="deleteactivitybtn"
              >
                <i className="fa-solid fa-trash fa-2xl"></i>
              </Button>
            </Card.Body>
          </Card>
        ))}
    </Row>
  );
}

export default Activitycard;
