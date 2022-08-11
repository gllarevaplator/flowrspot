import React, { useState } from "react";
import logo from "../../icons/old.svg";
import "./navBar.css";
import SignUpModal from "../Modals/SignUpModal";
import LoginModal from "../Modals/LoginModal";
import ProfileModal from "../Modals/ProfileModal";

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

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg" style={{ width: "100%" }}>
        <a className="navbar-brand" href="/">
          <img src={logo} />
        </a>
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
              <a className="nav-link" href="#">
                Flowers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Latest Sightings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Favorites
              </a>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <a className="nav-link">{user.first_name}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleLogOut}>
                    Log Out
                  </a>
                </li>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleOpenLoginModal}>
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link signup__button primary__button"
                    onClick={handleOpenSignUpModal}
                  >
                    Sign Up
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
