import React, { useState } from "react";
import ModalProps from "../../models/modalProps";
import { useFormik } from "formik";
import { modalStyle } from "./modalStyles/modalStyle";
import "./modalStyles/modalStyle.css";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextFieldInput from "../TextField/TextField";
import { useCreateSightingMutation } from "../../features/services/sightingsApi";
import mime from "mime";

interface FormProps {
  flower_id: string;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  picture: string;
  city: string;
}

const CreateSightingModal: React.FC<ModalProps> = ({ open, handleClose }) => {
  const [picture, setPicture] = useState<string | Blob>("");
  const [profilePictureError, setProfilePictureError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [createSighting, { isLoading, isError }] = useCreateSightingMutation();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
    touched,
  } = useFormik<FormProps>({
    initialValues: {
      flower_id: "",
      name: "",
      description: "",
      latitude: "",
      longitude: "",
      picture: "",
      city: "",
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
        .max(1000000000, "Latitude must be shorter!")
        .required("Latitude is Required"),
      longitude: Yup.number()
        .max(1000000000, "Latitude must be shorter!")
        .required("Longitude is Required"),
    }),
    onSubmit: (): void => {
      const data = new FormData();
      data.append("flower_id", values.flower_id);
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("latitude", values.latitude);
      data.append("longitude", values.longitude);
      data.append("picture", picture);

      createSighting(data)
        .unwrap()
        .then((e): void => {
          handleClose();
          handleReset(e);
        })
        .catch(
          ({
            data: createSightingError,
          }: {
            data: { error: string };
          }): void => {
            if (createSightingError) setErrorMessage(createSightingError.error);
          }
        );
    },
  });

  const handleImageUpload = (e: any) => {
    const { files } = e.target;
    const selectedFiles = files as FileList;
    setPicture(selectedFiles?.[0]);
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
                setErrorMessage("");
              }}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <TextFieldInput
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
            {isError && <span className="text-danger">{errorMessage}</span>}
            <button
              type="submit"
              className="btn submit__button primary__button mt-4 p-3"
              disabled={isLoading}
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
