import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Navbar() {
  const [modalState, setModalState] = useState(false);

  function handleModalState() {
    if (!modalState) {
      setModalState(true);
    } else {
      setModalState("wait");
      setTimeout(() => {
        setModalState(false);
      }, 400);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
  }

  return (
    <div>
      <div className="Nav">
        <button className="hambergur-button" onClick={handleModalState}>
          <i
            className="fa-solid fa-bars fa-3x"
            style={{ color: "#ffffff" }}
          ></i>
        </button>
        <span className="Appname">
          <a href={localStorage.getItem("token") ? "/Dashboard" : "/"}>
            Everlasting
          </a>
        </span>
        <ul>
          {localStorage.getItem("token") ? (
            <li>
              <a href={localStorage.getItem("token") ? "/Dashboard" : "/"}>
                Home
              </a>
            </li>
          ) : (
            <li>
              <a href="/Login">Log in</a>
            </li>
          )}
          <li>
            <a href="/Login" onClick={handleLogout}>
              Log out
            </a>
          </li>
          {/* <li><a href='/EditProfile'>Edit Pro</a></li>
            <li><a href='/EditActivity'>Edit Act</a></li>
            <li><a href='/RegisterForm'>Re from</a></li> */}
        </ul>
      </div>
      {modalState &&
        createPortal(
          <Modal modalState={modalState} handleModalState={handleModalState} />,
          document.getElementById("root")
        )}
    </div>
  );
}

function Modal({ handleModalState, modalState }) {
  return (
    <div className="backdrop">
      <div className="modal-box" state={modalState.toString()}>
        <div className="button-box">
          <button className="close-button" onClick={handleModalState}>
            <i class="fa-solid fa-xmark fa-3x"></i>
          </button>
        </div>

        <div className="modal-ul-box">
          <ul>
            {localStorage.getItem("token") ? (
              <li>
                <a href={localStorage.getItem("token") ? "/Dashboard" : "/"}>
                  Home
                </a>
              </li>
            ) : (
              <li>
                <a href="/Login">Log in</a>
              </li>
            )}
            <li>
              <a href="#">Log out</a>
            </li>
          </ul>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default Navbar;
