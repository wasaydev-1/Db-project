import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import * as actions from "../../redux/actions";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const item = props.location.state;
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSuccess = (res) => {
    console.log("onSuccess", res);

    sessionStorage.setItem("userdetails", JSON.stringify(res.user));
    dispatch(actions.login(res.user));
    setIsLoggedIn(true);
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

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = () => {
    if (validateForm()) {
      // Dispatch signup action or API call here
      // Example: dispatch(actions.signup(formData));
      axios({
        url: "http://localhost:5000/auth/api/login",
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
            onSuccess(res.data);
            history.push("/product");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // Set isLoggedIn to true upon successful signup
      // setIsLoggedIn(true);
    }
  };
  return (
    <div>
      {isLoggedIn && item?.redirectto && <Redirect to={item.redirectto} />}
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-4 col-md-6 col-sm-12">
          <div className="card-body">
            <h5 className="card-title">Login</h5>
            <div className="dropdown-divider"></div>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            {errors.length > 0 && (
              <div className="text-danger">{errors.confirmPassword}</div>
            )}{" "}
            <div
              className="btn btn-success btn-block"
              onClick={handleLogin}
            >{`LOGIN`}</div>
            <div className="dropdown-divider">OR</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
