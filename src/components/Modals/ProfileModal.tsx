import React, { useState, useEffect } from "react";
import "./modalStyles/modalStyle.css";
import Modal from "@mui/material/Modal";
import ModalProps from "../../models/modalProps";
import { Avatar, Box } from "@mui/material";
import { modalStyle } from "./modalStyles/modalStyle";

const ProfileModal: React.FC<ModalProps> = ({
  open,
  handleOpen,
  handleClose,
  userFromLogin,
  user,
}) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                if (userFromLogin) {
                  window.location.href = "/";
                  handleClose();
                } else {
                  handleClose();
                }
              }}
            ></button>
          </div>
          {user || userFromLogin ? (
            <>
              <div className="d-flex mt-4">
                <Avatar sx={{ width: 60, height: 60 }} className="mb-5">
                  {user?.first_name || userFromLogin?.first_name}
                </Avatar>
                <div className="mt-2 avatar__description">
                  <h4>
                    {user?.first_name || userFromLogin?.first_name}{" "}
                    {user?.last_name || userFromLogin?.last_name}
                  </h4>
                  <p className="paragraph__info">
                    {user?.id || userFromLogin?.id} Sightings
                  </p>
                </div>
              </div>
              <p className="paragraph__info">First Name</p>
              <h5 className="user__firstname">
                {user?.first_name || userFromLogin?.first_name}
              </h5>
              <p className="paragraph__info">Last Name</p>
              <h5>{user?.last_name || userFromLogin?.last_name}</h5>

              <div className="d-flex justify-content-center button__wrapper">
                <button
                  onClick={handleLogout}
                  className="primary__button logout__button"
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <p>Something went wrong...</p>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
