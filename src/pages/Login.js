import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        //redirect home...
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = async (event) => {
    event.preventDefault();

    try {
      const credentials = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await setDoc(doc(db, "orders", credentials.user.uid), { allOrders: [] });
      await setDoc(doc(db, "basket", credentials.user.uid), { items: [] });
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="login logo"
          className="login__logo"
        ></img>
      </Link>
      <div className="login__container">
        <h2>Sign in</h2>
        <form>
          <h5>Email</h5>
          <input type="text" onChange={(e) => setEmail(e.target.value)}></input>
          <h5>Password</h5>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit" className="login__signInButton" onClick={login}>
            Sign in
          </button>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          <button className="login__registerButton" onClick={register}>
            Sign up (for the first time)
          </button>
          <button
            className="login__registerButton"
            onClick={() => navigate("/")}
          >
            Explore without an account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
