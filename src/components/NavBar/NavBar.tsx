import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import SignUpModal from "../Modals/SignUpModal";
import LoginModal from "../Modals/LoginModal";
import ProfileModal from "../Modals/ProfileModal";
import Avatar from "@mui/material/Avatar";
import logo from "../../icons/old.svg";
import "./navBar.css";

interface NavBarProps {
  user: any;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);
  const handleOpenSignUpModal = () => setOpenSignUpModal(true);
  const handleCloseSignUpModal = () => setOpenSignUpModal(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);
  const [profileModalUserInfo, setProfileModalUserInfo] = useState(null);

  const userCallback = useCallback((userInfo: any) => {
    setProfileModalUserInfo(userInfo);
  }, []);

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
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Favorites
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <a className="nav-link">{user.first_name}</a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link avatar__navbar"
                    onClick={handleOpenProfileModal}
                  >
                    <Avatar className="avatar__navbar">PG</Avatar>
                  </a>
                </li>
              </>
            )}
            {!user && (
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
            userInfoCallback={userCallback}
          />
          <ProfileModal
            open={openProfileModal}
            handleOpen={handleOpenProfileModal}
            handleClose={handleCloseProfileModal}
            userFromLogin={profileModalUserInfo}
            user={user}
          />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
