import React, { useState } from "react";
import ModalProps from "../../models/modalProps";
import { post } from "../../services/apiService";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import "./modalStyles/modalStyle.css";
import { modalStyle } from "./modalStyles/modalStyle";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextFieldInput from "../TextField/TextField";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormProps {
  first_name: string;
  last_name: string;
  date_of_birth: Date | string;
  password: string;
  email: string;
}

const SignUpModal: React.FC<ModalProps> = ({
  open,
  handleOpen,
  handleClose,
  handleOpenLoginModal,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | string>(new Date());
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
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      date_of_birth: selectedDate,
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, "First Name must be longer!")
        .max(25, "First Name must be shorter!")
        .required("First Name is Required"),
      last_name: Yup.string()
        .min(2, "Last Name must be longer!")
        .max(25, "Last Name must be shorter!")
        .required("Last Name is Required"),
      email: Yup.string().email().required("Email is Required"),
      password: Yup.string()
        .min(6, "Password must be longer!")
        .max(25, "Password must be shorter!!")
        .required("Password is Required"),
    }),
    onSubmit: async () => {
      await post("/users/register", values)
        .then((e) => {
          handleClose();
          handleReset(e);
          setError(false);
          setErrorMessage("");
          swal({
            title:
              "Congratulations! You have successfully signed up for FlowrSpot!",
            icon: "success",
            buttons: {
              confirm: {
                text: "OK",
                className: "primary__button text-center",
              },
            },
          }).then(handleOpenLoginModal);
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
              Create an Account
            </Typography>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={(e) => {
                handleClose();
                handleReset(e);
              }}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <TextFieldInput
              id="First Name"
              label="First Name"
              name="first_name"
              type="text"
              sx={{ mb: 2, width: "100%" }}
              variant="outlined"
              value={values.first_name}
              touched={touched.first_name}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={errors.first_name}
            />
            <TextFieldInput
              id="Last Name"
              label="Last Name"
              name="last_name"
              type="text"
              sx={{ mb: 2, width: "100%" }}
              variant="outlined"
              value={values.last_name}
              touched={touched.last_name}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={errors.last_name}
            />
            <LocalizationProvider
              sx={{ width: "100%" }}
              dateAdapter={AdapterDateFns}
            >
              <DatePicker
                label="Birth Date"
                value={selectedDate}
                onChange={(date: any) => {
                  let formattedDate = `${
                    date.getMonth() + 1
                  }-${date.getDate()}-${date.getFullYear()}`;
                  setSelectedDate(formattedDate);
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ mb: 2, width: "100%" }} />
                )}
              />
            </LocalizationProvider>
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
              Create Account
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default SignUpModal;
