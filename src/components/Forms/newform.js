import React, { useState } from "react";
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

import NonThapar from "../Forms/NonThapar";

const newform = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [getRoll, setGetRoll] = useState(false);

  const [formData, setFormData] = useState({ is_thaparian: false });
  const [fileSelected, setFileSelected] = useState(null);
  const [formValidError, setFormValidError] = useState(false);
  const [errors, setErrors] = useState("");
  function handleModal() {
    setLoginModal(!loginModal);
  }

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .max(150, "Name should not be more than 150 characters")
      .required("Name is required"),
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
    id_proof: yup.mixed().required("ID proof is required"),
  });

  function handleForm() {
    formSchema
      .validate(formData, { abortEarly: false })
      .then((valid) => {
        console.log(valid);
        setFormValidError(false);
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
    <div>
      <Modal open={loginModal} onClose={handleModal}>
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
              )}
            </div>
            <Button
              variant="outlined"
              component="label"
              color="warning"
              onChange={(e) => {
                setFormData({ ...formData, id_proof: e.target.files[0] });
                setFileSelected(true);
              }}
            >
              <input type="file" hidden required /> Upload College ID
            </Button>
            {fileSelected && (
              <FormHelperText>
                {formData.id_proof.name} is selected
              </FormHelperText>
            )}
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

export default newform;
