import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Login.module.css";
import axios from "axios";
import { GlobalContext } from "../components/GlobalContext";
import { LoginContext } from "../components/LoginContext";
const Login = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  const { loginData, setLoginData } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [resdata, setResData] = useState("");
  const [errors, setErrors] = useState({});

  var address = process.env.REACT_APP_IP_ADDRESS;
  var navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();

    // Perform form validation
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    var fetchData = async () => {
      try {
        var { data } = await axios.post(
          `${address}/user/login?email=${email}&password=${password}`
        );
        // var { data } = await axios.post(
        //   `http://localhost:8080/user/login?email=${email}&password=${password}`
        // );

        setGlobalData(data);
        // setLoginData(true);
        // console.log(data);
        if (data.data.role === "Admin") {
          setLoginData(true);
          navigate("/adminLanding");
        } else if (data.data.role === "Trainee") {
          setLoginData(true);
          navigate("/greeting");
        } else {
          setLoginData(false);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        alert("User not found. Please enter the correct credentials");
      }
    };
    fetchData();
  };
  return (
    <section className={Styles.formContainer}>
      <form onSubmit={handleSubmit} className={Styles.formBody}>
        <h2>Login</h2>
        <div>
          {/* <label for="email">Email:</label> */}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="email"
            className={Styles.formInput}
            placeholder="Enter Email"
            name="email"
          />
          {/* {errors.email && <div className={Styles.error}>{errors.email}</div>} */}
        </div>

        <div>
          {/* <label for="pass">Password:</label> */}
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="pass"
            className={Styles.formInput}
            placeholder="Enter Password"
            name="password"
          />
          {/* {errors.password && (
            <div className={Styles.error}>{errors.password}</div>
          )} */}
        </div>

        <div className={Styles.formButton}>
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
