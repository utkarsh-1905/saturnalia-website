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
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";
import modalStyles from "./modal.module.scss";
import * as yup from "yup";

import axios from "axios";

import SittingMan from "./sittingBhoot.svg";
import { Container } from "@mui/system";

import { useCookies } from "react-cookie";

const NewForm = (props) => {
  const [getRoll, setGetRoll] = useState(false);

  const [formData, setFormData] = useState({ is_thaparian: false });
  const [fileSelected, setFileSelected] = useState(null);
  const [formValidError, setFormValidError] = useState(false);
  const [errors, setErrors] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageSelected, setImageSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState(1);
  const [loginData, setLoginData] = useState({});

  const [cookie, setCookie] = useCookies(["authToken"]);

  const uploadImage = async () => {
    const imgData = new FormData();
    imgData.append("file", imageSelected);
    imgData.append("upload_preset", "sa3qpzmd");

    const cloudinary_Cloud_Name = "dv7jje0bw";

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinary_Cloud_Name}/image/upload`,
      imgData
    );
    setFormData({ ...formData, id_proof: res.data.secure_url });
    if (res) {
      let tempdata = { ...formData };
      tempdata.id_proof = res.data.secure_url;
      tempdata.roll_no = "";
      setFormData(tempdata);
      validateForm(tempdata);
      console.log(formData);
    }
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
    roll_no: yup
      .string()
      .when("is_thaparian", {
        is: true,
        then: yup.string().required("Roll number is required"),
      })
      .default(""),
    college: yup
      .string()
      .when("is_thaparian", {
        is: false,
        then: yup
          .string()
          .max(350, "College name should be less then 250 characters")
          .required("College name is required"),
      })
      .default(""),
    id_proof: yup
      .string()
      .when("is_thaparian", {
        is: false,
        then: yup.string().url().required("ID proof is required"),
      })
      .default(""),
  });

  const loginSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "Min. 8 characters")
      .required("Password is required"),
  });

  async function handleForm() {
    setLoading(true);
    //getRoll if for isThaparian or not
    if (!getRoll) {
      await uploadImage();
    } else {
      let tempdata = { ...formData };
      tempdata.id_proof = "";
      tempdata.college = "";
      setFormData(tempdata);
      validateForm(tempdata);
    }
  }

  function validateForm(data) {
    formSchema
      .validate(data, { abortEarly: false })
      .then((valid) => {
        setFormValidError(false);
        submitForm(data);
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
    const body = new FormData();
    body.set("email", data.email);
    body.set("name", data.name);
    body.set("password", data.password);
    body.set("phone_no", data.phone_no);
    body.set("is_thaparian", data.is_thaparian);
    body.set("roll_no", data.roll_no);
    body.set("college", data.college);
    body.set("id_proof", data.id_proof);
    let res;
    try {
      res = await axios.post(
        "https://api.saturnaliatiet.com/auth/register/",
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (e) {
      console.log(e);
      if (e.response.status >= 400) {
        Object.keys(e.response.data.errors).forEach((key) => {
          setErrors((prev) => prev + e.response.data.errors[key] + " , ");
        });
        setLoading(false);
        setFormValidError(true);
        setTimeout(() => {
          setFormValidError(false);
          setErrors("");
        }, 5000);
      }
      return;
    }
    setShowSuccess(true);
    setLoading(false);
    setTimeout(() => {
      setShowSuccess(false);
      props.handleClose();
    }, 6000);
  }

  async function handleLogin() {
    setLoading(true);
    loginSchema
      .validate(loginData, { abortEarly: false })
      .then((valid) => {
        setFormValidError(false);
        console.log(valid);
        const body = {};
        body.email = loginData.email;
        body.password = loginData.password;
        axios
          .post("https://api.saturnaliatiet.com/auth/api-key/", body)
          .then((res) => {
            // localStorage.setItem("token", res.data.key);
            setLoading(false);
            setCookie("authToken", res.data.key, {
              path: "/",
              maxAge: 3600 * 24 * 3,
            });
            document.location.reload();
          })
          .catch((e) => {
            setLoading(false);
            if (e.response.status == 400) {
              setErrors((prev) => e.response.data["error"]);
              setFormValidError(true);
              setTimeout(() => {
                setFormValidError(false);
                setErrors("");
              }, 5000);
            } else if (e.response.status == 401) {
              setErrors((prev) => "Account not verified");
              setFormValidError(true);
              setTimeout(() => {
                setFormValidError(false);
                setErrors("");
              }, 5000);
            }
          });
        // axios.get("https://api.saturnaliatiet.com/auth/api-key/", {
        //  "email": loginData.email,
        //  "password": loginData.password
        //}).then((res)=>{
        //  console.log(res.data)
        //}).catch((err)=>console.log(err))
      })
      .catch((e) => {
        setLoading(false);
        e.inner.forEach((error) => {
          setErrors((prev) => prev + error.message + " , ");
        });
        setFormValidError(true);
        setTimeout(() => {
          setFormValidError(false);
          setErrors("");
        }, 3000);
      });
  }

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "background.paper",
    backgroundColor:
      "linear-gradient(180deg, #1C1C1C 0%, rgba(18, 18, 18, 0.65) 100%)",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={modalStyles.container}>
      <Modal open={props.open} onClose={() => props.close(false)}>
        <Box
          sx={modalStyle}
          style={{
            background:
              "linear-gradient(180deg, #1C1C1C 0%, rgba(18, 18, 18, 0.65) 100%)",
            color: "#fff",
          }}
        >
          <Tabs
            value={tabs}
            onChange={() => {
              if (tabs === 1) {
                setTabs(2);
              } else {
                setTabs(1);
              }
            }}
            variant="fullWidth"
            indicatorColor="info"
            textColor="primary"
          >
            <Tab label="Login" sx={{ color: "white" }} value={1} />
            <Tab label="Register" sx={{ color: "white" }} value={2} />
          </Tabs>
          {tabs === 2 && (
            <FormControl sx={{ width: "100%" }}>
              <div className={modalStyles.formContainer}>
                <TextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
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
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  required
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <TextField
                  variant="outlined"
                  label="Phone Number"
                  required
                  type="number"
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
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
                    sx={{
                      width: "100%",
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                    }}
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
                      sx={{
                        width: "100%",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                      }}
                      required={!getRoll}
                      onChange={(e) =>
                        !getRoll
                          ? setFormData({
                              ...formData,
                              college: e.target.value,
                            })
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
                onClick={() => handleForm()}
              >
                {loading ? <CircularProgress color="secondary" /> : "Register"}
              </Button>
            </FormControl>
          )}
          {tabs === 1 && (
            <Box>
              <form>
                <TextField
                  variant="outlined"
                  label="Email"
                  type="string"
                  required
                  sx={{
                    width: "100%",
                    marginBottom: 2,
                    marginTop: 2,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  required
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <Button
                  variant="contained"
                  sx={{ marginTop: "1rem", width: "100%" }}
                  onClick={() => handleLogin()}
                >
                  {loading ? <CircularProgress color="secondary" /> : "Login"}
                </Button>
              </form>
            </Box>
          )}
          <Snackbar open={formValidError}>
            <Alert severity="error">{errors}</Alert>
          </Snackbar>
          <Snackbar open={showSuccess}>
            <Alert severity="success">
              You are registered!! Click the link received in the mail to
              verify.
            </Alert>
          </Snackbar>
          <Container>
            {/* <img src={SittingMan} alt="Man sitting in Saturnalia " /> */}
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default NewForm;
