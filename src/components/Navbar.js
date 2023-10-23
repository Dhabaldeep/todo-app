import React from "react";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      {user ? (
        <>
          <div className="navbar-todo">
            <h1>What's the plan for today?</h1>
          </div>
          <div className="logout">
            <div className="icons">
              <TbLogout
                className="logout-icon"
                onClick={() => {
                  auth.signOut();
                  window.M.toast({
                    html: "Sign Out Successfully",
                    classes: "green",
                  });
                  navigate("/login");
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="navbar-todo">
            <h1>Todo</h1>
          </div>
          <div className="navbar-links">
            <Link to="/login" className="navbar-l active ">
              Login
            </Link>
            <Link to="/signup" className="navbar-l" >
              Sign Up
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
export default Navbar;
