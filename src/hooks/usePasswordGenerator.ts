import { useState } from "react";

interface CheckboxItem {
  title: string;
  state: boolean;
}

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkboxData: CheckboxItem[], length: number) => {
    let charset = "",
      generatedPassword = "";

    const selectedOption = checkboxData.filter((checkbox: CheckboxItem) => checkbox.state);

    if(selectedOption.length === 0){
      setErrorMessage("Select at least One of the options to start generating")
      setPassword("")
      return;
    }

    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Letters":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charset += "0123456789";
          break;
        case "Include Symbols":
          charset += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });

    for(let i = 0; i < length; i++){
      const randomIndex = Math.floor(Math.random() * charset.length)
      generatedPassword +=  charset[randomIndex]
    }

    setPassword(generatedPassword)
    setErrorMessage("")
  };

  return { password, errorMessage, generatePassword };
};
export default usePasswordGenerator;
