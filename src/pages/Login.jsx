import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Login.module.css";
import axios from "axios";
import logo from "./alpha.png";

// import { LoginContext } from "../components/LoginContext";
import { GlobalContext } from "../components/GlobalContext";
const Login = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // console.log(loginData);
  var address = process.env.REACT_APP_IP_ADDRESS;
  var navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();

    var fetchData = async () => {
      try {
        var { data } = await axios.get(
          `${address}/user/login?userEmail=${email}&userPassword=${password}`
        );

        setGlobalData(data);
        if (data.data.role === "ADMIN") {
          let adminRoute = btoa("adminLanding");

          localStorage.setItem("loginAdmin", JSON.stringify(true));
          sessionStorage.setItem("adminData", JSON.stringify(data.data));
          window.location.assign(`/${adminRoute}`);
        } else if (data.data.role === "TRAINEE") {
          localStorage.setItem("traineeLogin", true);
          localStorage.setItem("traineeData", JSON.stringify(data.data));
          navigate(`/${btoa("traineeLanding")}`);
        } else if (data.data.role === "TRAINER") {
          let expertRoute = btoa("expertLanding");

          localStorage.setItem("loginAdmin", JSON.stringify(true));
          localStorage.setItem("expertLogin", JSON.stringify(true));
          localStorage.setItem("expertData", JSON.stringify(data.data));
          window.location.assign(`/${expertRoute}`);
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
      <div>
        <img src={logo} alt="" style={{ width: "40vw" }} />
      </div>
      <div>
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

          <div className="formInputDiv">
            {/* <label for="pass">Password:</label> */}
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="pass"
              className={Styles.formInput}
              placeholder="Enter Password"
              name="password"
            />
          </div>
          <div className="m-0 d-flex justify-content-end">
            <p
              style={{ fontSize: 10, cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </p>
          </div>
          <div className={Styles.formButton}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
