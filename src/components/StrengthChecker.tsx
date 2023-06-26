import React from "react";

interface strengthProps {
  password: string;
}

const StrengthChecker: React.FC<strengthProps> = ({ password }) => {
  const getPasswordLength = () => {
    if (password.length < 1) {
      return "";
    } else if (password.length < 4) {
      return "Very Weak";
    } else if (password.length < 8) {
      return "Poor";
    } else if (password.length < 12) {
      return "Medium";
    } else if (password.length < 16) {
      return "Strong";
    } else {
      return "Very Strong";
    }
  };
  
  const passwordStrength = getPasswordLength()
  if(!passwordStrength) return <React.Fragment />

  return (
    <div className="passwordStrength">
        Strength: <span style={{fontWeight: "bold", color: password.length < 8 ? "red" : "white"}}>{passwordStrength}</span>
    </div>
  )
};
export default StrengthChecker;
