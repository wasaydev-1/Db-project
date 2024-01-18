import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import * as actions from "../../redux/actions";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const Signup = (props) => {
  const item = props.location.state;
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic email validation
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Invalid email address";
    }

    // Basic password validation
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      // Dispatch signup action or API call here
      // Example: dispatch(actions.signup(formData));
      axios({
        url: "http://localhost:5000/auth/api/signup",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ...formData,
        },
      })
        .then((res) => {
          console.log("res ", res);
          if (res.status === 200 || res.status === 201) {
            history.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // Set isLoggedIn to true upon successful signup
      // setIsLoggedIn(true);
    }
  };

  const onSuccess = (res) => {
    console.log("onSuccess", res);
    // Handle Google login success if needed
  };

  return (
    <div>
      {isLoggedIn && item?.redirectto && <Redirect to={item.redirectto} />}
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-4 col-md-6 col-sm-12">
          <div className="card-body">
            <h5 className="card-title">Signup</h5>
            <div className="dropdown-divider"></div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-control"
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-control"
              />
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="btn btn-success btn-block" onClick={handleSignup}>
              {`Signup`}
            </div>
            <div className="dropdown-divider">OR</div>
            <GoogleLogin
              clientId={
                "941695139278-l2ae3g0jmg7do2p1a4gicn8vk17j55ij.apps.googleusercontent.com"
              }
              buttonText="Login with Google"
              onSuccess={onSuccess}
              className="btn-block"
              theme="dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
