import React, { useState, useEffect } from "react";
import ModalProps from "../../models/modalProps";
import { post } from "../../services/apiService";
import { useFormik, validateYupSchema } from "formik";
import { modalStyle } from "./modalStyles/modalStyle";
import "./modalStyles/modalStyle.css";
import * as Yup from "yup";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextFieldInput from "../TextField/TextField";

interface FormikInitialValues {
  flower_id: number | string;
  name: string;
  description: string;
  latitude: number | string;
  longitude: number | string;
  picture: string;
}

const CreateSightingModal: React.FC<ModalProps> = ({
  open,
  handleOpen,
  handleClose,
}) => {
  const [picture, setPicture] = useState<null | string>(null);
  const [profilePictureError, setProfilePictureError] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    return () => {
      setPicture(null);
      setProfilePictureError("");
    };
  }, []);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
    touched,
  } = useFormik<FormikInitialValues>({
    initialValues: {
      flower_id: "",
      name: "",
      description: "",
      latitude: "",
      longitude: "",
      picture: "",
    },
    validationSchema: Yup.object({
      flower_id: Yup.number()
        .max(1000000, "Id must be shorter!")
        .required("Id is Required"),
      name: Yup.string()
        .min(2, "Name must be longer!")
        .max(25, "Name must be shorter!")
        .required("Name is Required"),
      description: Yup.string()
        .min(2, "Description must be longer!")
        .max(35, "Description must be shorter!")
        .required("Description is Required"),
      latitude: Yup.number()
        .max(1000000000, "Latitude must be longer!")
        .required("Latitude is Required"),
      longitude: Yup.number()
        .max(1000000000, "Latitude must be longer!")
        .required("Longitude is Required"),
    }),
    onSubmit: async () => {
      const allValues = { ...values, picture };
      const token = localStorage.getItem("token");
      try {
        // const response = post("/sightings", allValues, {
        //   headers: {
        //     Authorization: token,
        //   },
        // });
        // console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  });
  console.log(picture);

  const handleImageUpload = (e: any) => {
    const image = e.currentTarget.files[0];
    let fileReader: any = new FileReader();
    fileReader.onload = () => {
      setPicture(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  };

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
              id="Flower Id"
              label="Flower Id"
              name="flower_id"
              type="number"
              sx={{ mb: 2, width: "100%" }}
              variant="outlined"
              value={values.flower_id}
              touched={touched.flower_id}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={errors.flower_id}
            />
            <TextFieldInput
              id="Name"
              label="Name"
              name="name"
              type="text"
              sx={{ mb: 2, width: "100%" }}
              variant="outlined"
              value={values.name}
              touched={touched.name}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={errors.name}
            />
            <TextFieldInput
              id="Description"
              label="Description"
              name="description"
              type="text"
              sx={{ mb: 2, width: "100%" }}
              variant="outlined"
              value={values.description}
              touched={touched.description}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={errors.description}
            />
            <TextFieldInput
              id="Latitude"
              label="Latitude"
              name="latitude"
              type="number"
              sx={{ mb: 2, width: "100%" }}
              variant="outlined"
              value={values.latitude}
              touched={touched.latitude}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={errors.latitude}
            />
            <TextFieldInput
              id="Longitude"
              label="Longitude"
              name="longitude"
              type="number"
              sx={{ mb: 2, width: "100%" }}
              variant="outlined"
              value={values.longitude}
              touched={touched.longitude}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={errors.longitude}
            />
            <TextFieldInput
              id="Picture"
              label=""
              name="picture"
              type="file"
              sx={{ mb: 2, width: "100%" }}
              variant="outlined"
              touched={touched.picture}
              onBlur={handleBlur}
              onChange={handleImageUpload}
              errors={profilePictureError}
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

export default CreateSightingModal;
