import React, { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpForAdmin = () => {
  var [signUpData, setSignUpData] = useState({
    userName: "",
    userEmail: "",
    userPhoneNumber: "",
    notification: false,
    status: "ACTIVE",
    role: "",
  });

  // useEffect(() => {
  //   if (exp === "TRAINEE") {
  //     setUser("Trainee");
  //   } else if (exp === "EXPERT") {
  //     setUser("Expert");
  //   }
  // });

  var { userName, userEmail, userPhoneNumber, role } = signUpData;

  var address = process.env.REACT_APP_IP_ADDRESS;
  var handleChange = e => {
    var { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  var payload = signUpData;
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let { data } = await axios.post(`${address}/user/saveUser`, payload);
      // console.log(data);
      toast.success("Trainee Added", {
        className: "toastMessage",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setSignUpData({
      userName: "",
      userEmail: "",
      userPhoneNumber: "",
      notification: false,
      status: "ACTIVE",
      role: "",
    });
  };
  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-4">Add User</h1>
      <div className="row mt-3">
        <div className="col-2"></div>
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Select Role
              </label>
              <select
                className="form-select"
                name="role"
                id="role"
                value={role}
                onChange={handleChange}
                required
              >
                <option value="">Select a role</option>
                <option value="TRAINEE">Trainee</option>
                <option value="EXPERTISE">Expert</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="user" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="user"
                name="userName"
                value={userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="trainEmail" className="form-label">
                User Email
              </label>
              <input
                type="email"
                className="form-control"
                id="trainEmail"
                name="userEmail"
                value={userEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="trainNum" className="form-label">
                User Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="trainNum"
                name="userPhoneNumber"
                value={userPhoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="trainPass" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="trainPass"
                name="userPassword"
                value={userPassword}
                onChange={handleChange}
                required
              />
            </div> */}

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default SignUpForAdmin;
