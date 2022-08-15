import React, { useState } from "react";
import ModalProps from "../../models/modalProps";
import { post } from "../../services/apiService";
import { getUserInfo } from "../../services/getUser";
import { useFormik } from "formik";
import { modalStyle } from "./modalStyles/modalStyle";
import * as Yup from "yup";
import "./modalStyles/modalStyle.css";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextFieldInput from "../TextField/TextField";

interface FormProps {
  email: string;
  password: string;
}

const LoginModal: React.FC<ModalProps> = ({
  open,
  handleOpen,
  handleClose,
  handleOpenProfileModal,
  userInfoCallback,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    values,
    errors,
    touched,
    handleChange,
    handleReset,
    handleSubmit,
    handleBlur,
  } = useFormik<FormProps>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is Required"),
      password: Yup.string()
        .min(6, "Password must be longer!")
        .max(25, "Password must be shorter!!")
        .required("Password is Required"),
    }),
    onSubmit: async () => {
      await post("/users/login", values)
        .then(async ({ data: user }) => {
          localStorage.setItem("token", user.auth_token);
          getUserInfo().then((userInfo) => userInfoCallback(userInfo));
        })
        .then((e) => {
          handleReset(e);
          setError(false);
          setErrorMessage("");
          swal({
            title: "Congratulations! You have successfully logged in!",
            icon: "success",
            buttons: {
              deny: { text: "OK", className: "primary__button text-center" },
              confirm: {
                text: "PROFILE",
                className: "primary__button text-center",
              },
            },
          }).then((response) => {
            if (response === true) {
              handleClose();
              handleOpenProfileModal();
            } else {
              handleClose();
              window.location.href = "/";
            }
          });
        })
        .catch(({ response }) => {
          setError(true);
          setErrorMessage(response.data.error);
        });
    },
  });

  return (
    <>
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
              Welcome Back
            </Typography>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={(e) => {
                handleClose();
                handleReset(e);
                setError(false);
                setErrorMessage("");
              }}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <TextFieldInput
              id="Email"
              label="Email"
              name="email"
              type="email"
              sx={{ mb: 2, width: "100%" }}
              variant="outlined"
              value={values.email}
              touched={touched.email}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={errors.email}
            />
            <TextFieldInput
              id="Password"
              label="Password"
              name="password"
              type="password"
              sx={{ mb: 2, width: "100%" }}
              variant="outlined"
              value={values.password}
              touched={touched.password}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={errors.password}
            />
            {error && <span className="text-danger">{errorMessage}</span>}
            <button
              type="submit"
              className="btn submit__button primary__button mt-4 p-3"
            >
              Login to your Account
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default LoginModal;
