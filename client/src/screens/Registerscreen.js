import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import axios from "axios";

function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [cmnd, setcmnd] = useState("");
  const [ address, setaddress] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  async function register() {
    if (password == cpassword) {
      const user = {
        name,
        email,
        cmnd,
        address,
        password,
        cpassword,
      }
      
      try{
        setLoading(true);
        const result = await axios.post('/api/users/register', user).data;
        setLoading(false);
        setSuccess(true);

        setname("");
        setemail("");
        setcmnd("");
        setaddress("");
        setpassword("");
        setcpassword("");

      } catch(error){
        console.log(error);
        setLoading(false);
        setError(true);
      }

    } else {
      alert("Password does not match");
    }
  }

  return (
    <div>
     
        {error && (<Error/>)}
        
      <div className="row justify-content-center mt-5 ">
        <div className="col-md-5 mt-5">
        {success && (<Success message="Registration success"/>)}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="CMND"
              value={cmnd}
              onChange={(e) => {
                setcmnd(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setaddress(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
