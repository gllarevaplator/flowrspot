import React, { useState } from "react";
import { useAppSelector } from "../../features/app/store";
import { Link } from "react-router-dom";
import SignUpModal from "../Modals/SignUpModal";
import LoginModal from "../Modals/LoginModal";
import ProfileModal from "../Modals/ProfileModal";
import Avatar from "@mui/material/Avatar";
import logo from "../../icons/old.svg";
import "./navBar.css";

const NavBar: React.FC = () => {
  const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);
  const handleOpenSignUpModal = () => setOpenSignUpModal(true);
  const handleCloseSignUpModal = () => setOpenSignUpModal(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);
  const user = useAppSelector((state) => state.user);
  const { first_name } = user;

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg" style={{ width: "100%" }}>
        <Link className="navbar-brand" to="/">
          <img src={logo} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/flowers">
                Flowers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/latest-sightings">
                Latest Sightings
              </Link>
            </li>
            {first_name && (
              <>
                <li className="nav-item">
                  <a className="nav-link">{first_name}</a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link avatar__navbar"
                    onClick={handleOpenProfileModal}
                  >
                    <Avatar className="avatar__navbar">{first_name}</Avatar>
                  </a>
                </li>
              </>
            )}
            {!first_name && (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="login_button"
                    onClick={handleOpenLoginModal}
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link signup__button primary__button"
                    onClick={handleOpenSignUpModal}
                  >
                    New Account
                  </a>
                </li>
              </>
            )}
          </ul>
          <SignUpModal
            open={openSignUpModal}
            handleOpen={handleOpenSignUpModal}
            handleClose={handleCloseSignUpModal}
            handleOpenLoginModal={handleOpenLoginModal}
          />
          <LoginModal
            open={openLoginModal}
            handleOpen={handleOpenLoginModal}
            handleClose={handleCloseLoginModal}
            handleOpenProfileModal={handleOpenProfileModal}
          />
          <ProfileModal
            open={openProfileModal}
            handleOpen={handleOpenProfileModal}
            handleClose={handleCloseProfileModal}
          />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
