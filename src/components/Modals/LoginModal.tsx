import React, { useState } from "react";
import {
  AuthResponse,
  useSetUserLoginCredentialsMutation,
} from "../../features/services/userApi";
import { useLazyGetUserInfoQuery } from "../../features/services/userApi";
import { useFormik } from "formik";
import { modalStyle } from "./modalStyles/modalStyle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextFieldInput from "../TextField/TextField";
import ModalProps from "../../models/modalProps";
import swal from "sweetalert";
import "./modalStyles/modalStyle.css";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

interface FormProps {
  email: string;
  password: string;
}

const LoginModal: React.FC<ModalProps> = ({
  open,
  handleClose,
  handleOpenProfileModal,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [setUserLoginCredentials, isError] =
    useSetUserLoginCredentialsMutation();
  const [trigger, { isLoading }] = useLazyGetUserInfoQuery();

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
    onSubmit: (): void => {
      setUserLoginCredentials({
        email: values.email,
        password: values.password,
      })
        .unwrap()
        .then((data: AuthResponse): void => {
          setErrorMessage("");
          const token = data.auth_token;
          const decodedToken: { user_id: number; exp: number } =
            jwt_decode(token);
          trigger(decodedToken.user_id);
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
          }).then((response: boolean): void => {
            if (response === true) {
              handleClose();
              handleOpenProfileModal?.();
            } else {
              handleClose();
            }
          });
        })
        .then((e): void => {
          handleReset(e);
          handleClose();
        })
        .catch(({ data: loginError }: { data: { error: string } }): void => {
          setErrorMessage(loginError.error);
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
              onClick={(e): void => {
                handleClose();
                handleReset(e);
                setErrorMessage("");
              }}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <TextFieldInput
              required
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
              required
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
            {isError && <span className="text-danger">{errorMessage}</span>}
            <button
              type="submit"
              className="btn submit__button primary__button mt-4 p-3"
              disabled={isLoading}
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
