import React from "react";
import "@styles/spinner.css"; 

const Spinner: React.FC = () => {
  return (
    <div className="global-spinner-overlay">
      <div className="global-spinner"></div>
    </div>
  );
};

export default Spinner;