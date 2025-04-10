import React from "react";
import "../pages/admin.css";  

const Header = () => {
    return (
      <header className="b-header">
        <div className="b-header-content">
          <img src="/logo.png" alt="Institute Logo" className="gs-logo" />
          <div className="text">
            <h1>Shri G.S. Institute Of Tech. & Science</h1>
            <p>23 Sir M. Visvesvaraya Marg, Indore, Madhya Pradesh 452003</p>
          </div>
        </div>
      </header>
    );
  };

  export default Header;