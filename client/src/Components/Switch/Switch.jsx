import React, { useState } from "react";
import "./Switch.scoped.css";

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider">
        <img src="/assets/vosyn_logo.png" alt="slider" />
      </span>
    </label>
  );
};

export default Switch;
