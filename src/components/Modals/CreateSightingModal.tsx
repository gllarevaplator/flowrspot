import React, { useState, useEffect } from "react";
import ModalProps from "../../models/modalProps";
import { post } from "../../services/apiService";
import { useFormik } from "formik";
import { modalStyle } from "./modalStyles/modalStyle";
import "./modalStyles/modalStyle.css";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextFieldInput from "../TextField/TextField";

const CreateSightingModal: React.FC<ModalProps> = ({
  open,
  handleOpen,
  handleClose,
  sightings,
  newSightingCallback,
  loadingCallback,
}) => {
  const [picture, setPicture] = useState<any>(null);
  const [profilePictureError, setProfilePictureError] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
    touched,
  } = useFormik({
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
    onSubmit: () => {
      const data = new FormData();
      data.append("picture", picture);
      data.append("flower_id", values.flower_id);
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("latitude", values.latitude);
      data.append("longitude", values.longitude);
      const token: any = localStorage.getItem("token");
      loadingCallback(true);
      post("/sightings", data, {
        headers: {
          Authorization: token,
          "Content-Type": `multipart/form-data`,
        },
      })
        .then(({ data }) => {
          newSightingCallback([data.sighting, ...sightings]);
          handleClose();
          loadingCallback(false);
        })
        .then((e) => {
          handleReset(e);
        })
        .catch((err) => {
          setError(true);
          console.log(err.response);
        });
    },
  });

  const handleImageUpload = (e: any) => {
    const image = e.currentTarget.files[0];
    setPicture(image);
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
              Create a new Sighting
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
              Create
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CreateSightingModal;
