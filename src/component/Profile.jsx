import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import DefaultImg from "../images/profile.jpeg";
import axios from "axios";
import BACKEND_URL from "../../config.js";

function Profile() {
  const [profile, setProfile] = useState("");
  const [imagePreview, setImagePreview] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userProfile = await axios.get(
          `${BACKEND_URL}/user/getprofile`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setProfile(userProfile.data.userData);
      } catch (err) {}
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile.profileImage) {
      setImagePreview(`data:image/png;base64,${profile.profileImage}`);
    }
  }, [profile.profileImage]);

  return (
    <Card className="profilecard" key={profile._id}>
      <Card.Img
        variant="top"
        src={imagePreview || DefaultImg}
        className="profilepic"
      />
      <Card.Body>
        <Card.Title>
          {profile.firstname}
          &nbsp;
          {profile.lastname}
        </Card.Title>
        <Card.Text>
          Height: {profile.height} cm <br />
          Weight: {profile.weight} kg <br />
        </Card.Text>
        <a href={`/EditProfile/${profile._id}`}>
          <Button variant="secondary" className="editbtn">
            <i className="fa-solid fa-pen-to-square" /> Edit Profile
          </Button>
        </a>
        <a href="/AddActivity/data">
          <Button variant="secondary" className="addbtn">
            <i className="fa-regular fa-square-plus" /> Add Activity
          </Button>
        </a>
      </Card.Body>
    </Card>
  );
}

export default Profile;
