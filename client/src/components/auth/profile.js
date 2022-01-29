import React from "react";
import { Link } from "react-router-dom";

const Home = ({ logout }) => {
  return (
    <div>
      <Link to="/boards">Main Board</Link>
      <h1> Hi, you are logged in.</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;