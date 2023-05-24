import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Navbar/Layout";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./EditProfile.css";
import myPhoto from "./images/myPhoto.jpg";
import BACKEND_URL from "../config.js";

function EditProfile() {
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    height: "",
    weight: "",
    profileImage: "",
  });
  const [saveProfile, setSaveProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [bmi, setBmi] = useState("");
  const [adviseWeights, setAdviseWeights] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  //useNavigate
  const navigation = useNavigate();

  //useParams to get an id
  const { id } = useParams();

  //get profile to display
  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const fetchProfile = await axios.get(
          `${BACKEND_URL}/user/getprofile`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setProfile(fetchProfile.data.userData);
        //save to new state
        setSaveProfile(fetchProfile.data.userData);
        console.log(fetchProfile.data.userData);
      } catch (err) {}
    };
    getProfile();
  }, []);

  useEffect(() => {
    setImagePreview(`data:image/png;base64,${profile.profileImage}`);
  }, [profile.profileImage]);

  //change profile to edit mode
  function editProfileHandler() {
    setEditMode(true);
  }
  //change back to preview change
  function editBackProfileHandler() {
    setEditMode(false);
  }

  //profile edit
  function changeHandler({ target }) {
    const { name, value } = target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  //image handler
  function changeImageHandler(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFileToBase64(file);
    }
  }

  //change file to base64 for sending to backend
  function setFileToBase64(file) {
    const reader = new FileReader();
    console.log("reader", reader);
    reader.onloadend = (readerEvt) => {
      let binaryString = readerEvt.target.result;
      console.log("bistr", binaryString);
      setProfile((prev) => ({
        ...prev,
        profileImage: window.btoa(binaryString),
      }));
    };
    reader.readAsBinaryString(file);
  }

  //preview image on frontend
  function onPhotoUpload(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  //submit handler
  async function submitEditProfile(e) {
    e.preventDefault();

    const { firstname, lastname, height, weight, profileImage } = profile;

    //check condition to make sure user can choose to go back or stay here to edit
    if (
      firstname === saveProfile.firstname &&
      lastname === saveProfile.lastname &&
      height === saveProfile.height &&
      weight === saveProfile.weight &&
      profileImage === saveProfile.profileImage
    ) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Don't want to change anything?",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Dashboard");
        }
      });
    } else if (checkInput()) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
          `${BACKEND_URL}/user/editprofile/${id}`,
          {
            firstname,
            lastname,
            height,
            weight,
            profileImage,
          },
          { headers: { authorization: `Bearer ${token}` } }
        );

        setProfile((prev) => ({
          ...prev,
          firstname,
          lastname,
          height,
          weight,
          profileImage,
        }));

        const MySwal = withReactContent(Swal);
        MySwal.fire({
          icon: "success",
          title: response.data.msg,
        }).then(() => {
          navigation("/Dashboard");
        });
      } catch (err) {
        console.log(err);
      }
    } else if (profile.height === "" || profile.weight === "") {
      const msg = "Height and Weight must be specified!!";
      setErrorMessage(msg);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: msg,
      });
      return;
    } else {
      const msg = "Height and Weight must be a number!!";
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: msg,
      });
      return;
    }
  }

  //height and weight validation
  function checkInput() {
    const height = profile.height;
    const weight = profile.weight;
    const regex = /^[0-9]\d*$/;
    let status = true;
    if (height && weight) {
      if (!regex.test(height) || !regex.test(weight)) {
        const msg = "Height and Weight must be a number!!";
        setErrorMessage(msg);
        status = false;
      }
    } else {
      status = false;
    }
    return status;
  }
  //BMI and Advised Weight calculation part
  function calAdviseWeight(height) {
    const adviseWeight = 20 * (height / 100) ** 2;
    setAdviseWeights(adviseWeight.toFixed(0));
  }

  //re-render bmi and advised weight
  useEffect(() => {
    if (profile.height && profile.weight && checkInput()) {
      const weight = profile.weight;
      const height = profile.height;
      const BMI = weight / (height / 100) ** 2;
      setBmi(BMI.toFixed(2));
      calAdviseWeight(height);
      setErrorMessage(false);
    } else {
      setBmi("");
      calAdviseWeight(0);
    }
  }, [profile.height, profile.weight]);

  return (
    <Layout>
      <form onChange={changeImageHandler} onSubmit={submitEditProfile}>
        <div className="body-formpage">
          <div className="form-box">
            <label htmlFor="profile-img" className="upload-image">
              <img
                className="user-photo"
                src={imagePreview || myPhoto}
                style={{ width: "200px", height: "200px" }}
              />
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="profile-img"
              name="image"
              onChange={onPhotoUpload}
            />
            {!editMode && (
              <div className="edit-name-mode">
                <h2>
                  {profile.firstname}
                  &nbsp;
                  {profile.lastname}
                </h2>
                <button className="edit-name-btn" onClick={editProfileHandler}>
                  <EditIcon className="edit-icon" />
                </button>
              </div>
            )}
            {editMode && (
              <div className="edit-name-inmode">
                <label htmlFor="firstname">
                  <b>First Name</b>
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="firstname-edit-input"
                  placeholder={profile.firstname}
                  name="firstname"
                  value={profile.firstname || ""}
                  onChange={changeHandler}
                />
                <label htmlFor="lastname">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className="lastname-edit-input"
                  placeholder={profile.lastname}
                  name="lastname"
                  value={profile.lastname || ""}
                  onChange={changeHandler}
                />
                <button
                  className="edit-name-btn"
                  onClick={editBackProfileHandler}
                >
                  <EditIcon />
                </button>
              </div>
            )}
            <label htmlFor="height" className="height-label">
              <b>Height</b>
            </label>
            <input
              className="height"
              name="height"
              placeholder="height in Cm"
              value={profile.height}
              onChange={changeHandler}
            />
            <label htmlFor="weight" className="weight-label">
              <b>Weight</b>
            </label>
            <input
              className="weight"
              name="weight"
              placeholder="weight in Kg"
              value={profile.weight}
              onChange={changeHandler}
            />
            {errorMessage && <p className="error-submit">{errorMessage}</p>}
            <p className="BMI">
              Your BMI &nbsp;<b>{bmi}</b>
            </p>
            <p className="adivised-weight">
              Your advise weight is <b>{adviseWeights}</b> Kg
            </p>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default EditProfile;
