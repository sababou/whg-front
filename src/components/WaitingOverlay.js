import React from "react";

import "../assets/styles.css";

function WaitingOverlay() {
  return (
    <>
      <div className="global-overlay">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default WaitingOverlay;
