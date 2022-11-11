import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
  FormHelperText,
  Alert,
  Snackbar,
} from "@mui/material";
import modalStyles from "./modal.module.scss";
import * as yup from "yup";

import axios from "axios";

const NewForm = (props) => {
  const [getRoll, setGetRoll] = useState(false);

  const [formData, setFormData] = useState({ is_thaparian: false });
  const [fileSelected, setFileSelected] = useState(null);
  const [formValidError, setFormValidError] = useState(false);
  const [errors, setErrors] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "sa3qpzmd");

    const cloudinary_Cloud_Name = "dv7jje0bw";

    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudinary_Cloud_Name}/image/upload`,
        formData
      )
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data.secure_url);
        // setUploadedImgURL(response.data.secure_url);
        // setFormData({ ...formData, id_proof: response.data.secure_url });
        setImgUrl(response.data.secure_url);
      });
  };

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .max(150, "Name should not be more than 150 characters")
      .required("Name is required"),
    password: yup
      .string()
      .min(8, "Password should be atleast 8 characters")
      .required("Password is required"),
    email: yup.string().email().required("Email is required"),
    phone_no: yup
      .string()
      .min(10, "Phone number should be of 10 digits")
      .max(15, "Phone number should be less than 15 characters")
      .required("Phone number is required"),
    is_thaparian: yup.boolean().required("Please select an option"),
    roll_no: yup.string().when("is_thaparian", {
      is: true,
      then: yup.string().required("Roll number is required"),
    }),
    college: yup.string().when("is_thaparian", {
      is: false,
      then: yup
        .string()
        .max(350, "College name should be less then 250 characters")
        .required("College name is required"),
    }),
    id_proof: yup
      .string()
      .when("is_thaparian", {
        is: false,
        then: yup.string().url().required("ID proof is required"),
      })
      .default(""),
  });

  useEffect(() => {
    console.log("Link is :", formData.id_proof);
    setFormData({ ...formData, id_proof: imgUrl });
    validateForm();
  }, [imgUrl]);

  async function handleForm() {
    //getRoll if for isThaparian or not
    if (!getRoll) {
      await uploadImage();
    } else {
      setFormData({ ...formData, id_proof: "" });
      validateForm();
    }
  }

  function validateForm() {
    console.log(formData);
    formSchema
      .validate(formData, { abortEarly: false })
      .then((valid) => {
        setFormValidError(false);
        console.log(valid);
      })
      .catch((e) => {
        e.inner.forEach((error) => {
          setErrors((prev) => prev + error.message + " , ");
        });
        setFormValidError(true);
        setTimeout(() => {
          setFormValidError(false);
          setErrors("");
        }, 2000);
      });
  }

  async function submitForm(data) {
    console.log(data);
  }

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={modalStyles.container}>
      <Modal open={props.open} onClose={() => props.close(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h1" align="center">
            Register
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <div className={modalStyles.formContainer}>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                sx={{ width: "100%" }}
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                variant="outlined"
                label="Name"
                type="string"
                required
                sx={{ width: "100%" }}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                required
                sx={{ width: "100%" }}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <TextField
                variant="outlined"
                label="Phone Number"
                required
                type="number"
                sx={{ width: "100%" }}
                onChange={(e) =>
                  setFormData({ ...formData, phone_no: e.target.value })
                }
              />
              <RadioGroup
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <label>Are you from Thapar?</label>
                <FormControlLabel
                  value="thaparian"
                  control={
                    <Radio
                      onClick={() => setGetRoll(true)}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_thaparian: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  value="non-thaparian"
                  control={
                    <Radio
                      onClick={() => setGetRoll(false)}
                      checked={!getRoll}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_thaparian: e.target.checked,
                        })
                      }
                    />
                  }
                  label="No"
                />
              </RadioGroup>
              {getRoll ? (
                <TextField
                  variant="outlined"
                  label="Roll Number"
                  type="number"
                  sx={{ width: "100%" }}
                  required={getRoll}
                  onChange={(e) =>
                    getRoll
                      ? setFormData({ ...formData, roll_no: e.target.value })
                      : setFormData({ ...formData, roll_no: null })
                  }
                />
              ) : (
                <>
                  <TextField
                    variant="outlined"
                    label="College"
                    type="string"
                    sx={{ width: "100%" }}
                    required={!getRoll}
                    onChange={(e) =>
                      !getRoll
                        ? setFormData({ ...formData, college: e.target.value })
                        : setFormData({ ...formData, college: null })
                    }
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    color="warning"
                    sx={{ width: "100%" }}
                    onChange={(e) => {
                      // setFormData({ ...formData, id_proof: e.target.files[0] });
                      console.log(e);
                      setImageSelected(e.target.files[0]);
                      setFileSelected(true);
                    }}
                  >
                    <input type="file" hidden required /> Upload College ID
                  </Button>
                  {fileSelected && (
                    <FormHelperText>
                      {imageSelected.name} is selected
                    </FormHelperText>
                  )}
                </>
              )}
            </div>
            <Button
              variant="contained"
              sx={{ marginTop: "1rem" }}
              onClick={handleForm}
            >
              Submit
            </Button>
          </FormControl>
          <Snackbar open={formValidError}>
            <Alert severity="error">{errors}</Alert>
          </Snackbar>
        </Box>
      </Modal>
    </div>
  );
};

export default NewForm;
