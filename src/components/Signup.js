import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Signup({ user }) {
  const navigate = useNavigate();
  if (user) navigate("/");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleChange1 = (e) => {
    setEmail(e.target.value);
  };
  const handleChange2 = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // const result = await auth.createUserWithEmailAndPassword(email, password);
      // console.log(result);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      await sendEmailVerification(auth.currentUser);
      await auth.signOut();
      window.M.toast({
        html: "Check Your Inbox to verify your Email.",
        classes: "green",
        displayLength: 10000,
      });
      navigate("/login");
    } catch (err) {
      window.M.toast({ html: err.message, classes: "red" });
    }
  };

  return (
    <div className="container center">
      {/* <Navbar /> */}
      <h1>Please Signup....</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="login-value">
          <input
            type="text"
            className="todo-input"
            placeholder="Name"
            value={username}
            required
            name="usernamee"
            onChange={handleChange}
            autoComplete="off"
            // ref={inputRef}
          />
        </div>
        <div className="login-value">
          <input
            type="Email"
            className="todo-input"
            placeholder="Email"
            value={email}
            required
            name="signupEmail"
            onChange={handleChange1}
            autoComplete="off"
            // ref={inputRef}
          />
        </div>
        <div className="login-value">
          <input
            type="password"
            className="todo-input"
            placeholder="Password"
            value={password}
            required
            name="SignupPassword"
            onChange={handleChange2}
            autoComplete="off"
            // ref={inputRef}
          />
        </div>

        <button className="todo-button" type="submit">
          {" "}
          Signup
        </button>

        <h2>
          Already have an account?{" "}
          <Link to="/login" className="navbar-link ">
            <b>Sign in</b>
          </Link>
          .
        </h2>
      </form>
    </div>
  );
}

export default Signup;
