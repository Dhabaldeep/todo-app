import React, { useState } from "react";
import { auth } from "../firebase";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ user }) {
  const navigate = useNavigate();
  if (user) navigate("/");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const forgetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      window.M.toast({
        html: "Password Reset email sent successfully. checkout Inbox",
        classes: "green",
        displayLength: 5000,
      });
    } catch (err) {
      window.M.toast({
        html: err.message,
        displayLength: 9000,
        classes: "red",
      });
    }
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
      const result = await auth.signInWithEmailAndPassword(email, password);

      if (auth.currentUser.emailVerified) {
        window.M.toast({
          html: `Welcome ${result.user.displayName}`,
          classes: "green",
        });
        navigate("/");
      } else {
        window.M.toast({
          html: "Please verify your Email. checkout Inbox",
          classes: "orange",
          displayLength: 9000,
        });
        await sendEmailVerification(auth.currentUser);
        await auth.signOut();
      }
    } catch (err) {
      window.M.toast({
        html: err.message,
        displayLength: 9000,
        classes: "red",
      });
    }
  };

  return (
    <div className="container center">
      <h1>Please Login....</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="login-value">
          <input
            type="Email"
            className="todo-input"
            placeholder="Email"
            value={email}
            required
            name="text"
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
            name="text"
            required
            onChange={handleChange2}
            autoComplete="off"
            // ref={inputRef}
          />
        </div>

        <button className="todo-button" type="submit">
          {" "}
          Login
        </button>
      </form>
      <button className="forget" onClick={forgetPassword}>
        Forget Password
      </button>
    </div>
  );
}

export default Login;
