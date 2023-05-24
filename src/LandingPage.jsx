import Container from "react-bootstrap/esm/Container";
import "./LandingPage.css";
import Layout from "./Navbar/Layout";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Image from "react-bootstrap/Image";

function LandingPage() {
  return (
    <Container fluid className="LandingPage">
      <Navbar className="Navlanding">
        <Container fluid>
          <Navbar.Brand
            href={localStorage.getItem("token") ? "/Dashboard" : "/"}
          >
            <img
              alt=""
              src="./images/logotrans.png"
              width="30"
              height="30"
              className="d-inline-block align-top logotrans"
            />{" "}
            <span className="logintext">Everlasting</span>
          </Navbar.Brand>
          <a href={localStorage.token ? "/Dashboard" : "/Login"}>
            <span className="logintext">Log in</span>
          </a>
        </Container>
      </Navbar>
      {main()}
    </Container>
  );
}

export default LandingPage;

function main() {
  return (
    <Container fluid className="containerlanding">
      <Row className="rowcontainer">
        <Col className="main1left">
          <h1>STAY ACTIVE</h1> <br />
          <h1>STAY INDEPENDENT</h1> <br />
          <h1>THAT NEVER END</h1> <br />
        </Col>
        <Col className="main1right">
          <Image
            src="https://www.homecareassistancehuntsville.com/wp-content/uploads/2019/02/Senior-Couple-Running.jpg"
            className="acimg1"
          />
        </Col>
      </Row>
      <Row className="rowcontainer">
        <Col className="main2left">
          <Image
            src="http://www.ahandtoholdsd.com/wp-content/uploads/Senior-Couple-on-Bikes.jpg"
            className="acimg1"
          />
        </Col>
        <Col className="main2right">
          <h1 class="display-5 fw-bold lh-1 mb-1">Why Us?</h1>
          <br />
          <p class="lead">
            FEELING TRIED TO START WORK OUT??
            <br />
            <br />
            FEELING LIKE IT’S TOO LATE OR LONELY TO WORK OUT OR TO DO AN
            ACTIVITY???
            <br />
            <br />
            THAT’S WHY YOU NEED US
            <br />
            <br />
            WE WILL CHANGE YOUR MINDSET TO START LOVING WORKOUT WITH OUR
            COMMUNITY
            <br />
            <br />
            YOU WILL FIND YOUR GOALS AND HAVE A GOOD HEALTH AND FUN AT THE SAME
            TIME!!!
          </p>
        </Col>
      </Row>
      <Row className="rowcontainer">
        <Col className="main2">
          <h1 class="display-5 fw-bold lh-1 mb-1">OUR FEATURES</h1>
          <p class="lead">
            JOIN US TODAY AND START WORKING OUT TO GET THE PRIZE LIMITED TIME
            “HELLO MONDAY” POSTCARD FOR FREE!!!
          </p>
          <p>
            **NOT ONLY MONDAY, YOU WILL GET POSTCARDS FOR EACH DAY OF THE
            WEEK.**
          </p>
        </Col>
        <Col className="main2 groupcard">
          <CardGroup>
            <Card className="eachactivity">
              <Card.Img
                src="https://image1.masterfile.com/getImage/NjMyLTAxMTQ2NjUxZW4uMDAwMDAwMDA=AJu65G/632-01146651en_Masterfile.jpg"
                className="acimg"
              />
            </Card>
            <Card className="eachactivity">
              <Card.Img
                src="https://media.istockphoto.com/id/1187760500/photo/senior-couple-is-hiking-in-forest-adventure-travel-hike-and-people-concept.jpg?s=612x612&w=0&k=20&c=ixvqNEolLuETBUjunkP0lQgYcsbRWMg1W7yLG5POues="
                className="acimg"
              />
            </Card>
            <Card className="eachactivity">
              <Card.Img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjo8aAzsJXrmogegqhDr2vTF4H5Q8kyldEhg&usqp=CAU"
                className="acimg"
              />
            </Card>
          </CardGroup>
        </Col>
      </Row>
      {/* <Row className="groupcard">
        <Card className="eachactivity">
          <Card.Img
            src="https://www.homecareassistancehuntsville.com/wp-content/uploads/2019/02/Senior-Couple-Running.jpg"
            className="acimg"
          />
        </Card>
        <Card className="eachactivity">
          <Card.Img
            src="https://image1.masterfile.com/getImage/NjMyLTAxMTQ2NjUxZW4uMDAwMDAwMDA=AJu65G/632-01146651en_Masterfile.jpg"
            className="acimg"
          />
        </Card>
        <Card className="eachactivity">
          <Card.Img
            src="http://www.ahandtoholdsd.com/wp-content/uploads/Senior-Couple-on-Bikes.jpg"
            className="acimg"
          />
        </Card>
        <Card className="eachactivity">
          <Card.Img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjo8aAzsJXrmogegqhDr2vTF4H5Q8kyldEhg&usqp=CAU"
            className="acimg"
          />
        </Card>
        <Card className="eachactivity">
          <Card.Img
            src="https://media.istockphoto.com/id/1187760500/photo/senior-couple-is-hiking-in-forest-adventure-travel-hike-and-people-concept.jpg?s=612x612&w=0&k=20&c=ixvqNEolLuETBUjunkP0lQgYcsbRWMg1W7yLG5POues="
            className="acimg"
          />
        </Card>
      </Row> */}
    </Container>
  );
} 