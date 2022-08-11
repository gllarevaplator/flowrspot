import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import ModalProps from "../../models/modalProps";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { modalStyle } from "./modalStyles/modalStyle";
import { getUserInfo } from "../../services/getUser";

const ProfileModal: React.FC<ModalProps> = ({
  open,
  handleOpen,
  handleClose,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getInfo = async () => {
      const userData = await getUserInfo();
      setUser(userData);
      setLoading(false);
    };
    getInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const loadingData = () => {
    return <p>LOADINGG</p>;
  };

  if (loading) {
    loadingData();
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="modal__header">
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="text-center mb-4"
            >
              Profile Modal
            </Typography>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            ></button>
          </div>
          {user && (
            <>
              <Typography
                id="modal-modal-description"
                style={{ color: "#000" }}
                sx={{ mt: 2 }}
              >
                {user.first_name}
              </Typography>
              <Typography
                id="modal-modal-description"
                style={{ color: "#000" }}
                sx={{ mt: 2 }}
              >
                {user.last_name}
              </Typography>
              <button onClick={handleLogout}>LogOut</button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
