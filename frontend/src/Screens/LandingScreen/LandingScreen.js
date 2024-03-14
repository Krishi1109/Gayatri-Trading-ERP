import React from "react";
import LoginForm from "../../components/LoginForm";
import "./LandingScreen.css";

const LandingScreen = () => {
  return (
    <div className="landing-screen">
      <div className="shapes-container">
        <div className="shape circle"></div>
        <div className="shape circle2"></div>
        <div className="shape square"></div>
        <div className="shape triangle"></div>
        <div className="shape text text1">PROFIT</div>
        <div className="shape text text2">BUSINESS</div>
        <div className="shape text text3">FOCUS</div>
        <div className="shape text text4">EARN</div>
        <div className="shape text text5">BELIEVE</div>
      </div>
      <div className="content">
        <div className="brand-container">
          <h1 className="brand-name">Gayatri Trading</h1>
        </div>
        <div className="box-container">
          <div className="box">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
