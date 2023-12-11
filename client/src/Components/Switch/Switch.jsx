import React, { useState, useEffect } from "react";
import "./Switch.scoped.css";

const Switch = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (props.switch) setIsChecked(true);
  }, [props]);

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className={`slider ${isChecked ? "slider-on" : ""}`}>
        <img
          src={process.env.PUBLIC_URL + "/assets/vosyn_logo.png"}
          alt="slider"
        />
      </span>
    </label>
  );
};

export default Switch;
