import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Login.module.css";
import axios from "axios";
import { LoginContext } from "../components/LoginContext";
import { GlobalContext } from "../components/GlobalContext";
const Login = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  const { loginData, setLoginData } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(loginData);

  var address = process.env.REACT_APP_IP_ADDRESS;
  var navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();

    var fetchData = async () => {
      try {
        var { data } = await axios.post(
          `${address}/user/login?email=${email}&password=${password}`
        );

        setGlobalData(data);

        if (data.data.role === "ADMIN") {
          window.localStorage.setItem("loginAdmin", true);
          var adminLogin = localStorage.getItem("loginAdmin");
          setLoginData(adminLogin);
          navigate("/adminLanding");
        } else if (data.data.role === "TRAINEE") {
          navigate("/traineeLanding");
        } else {
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
