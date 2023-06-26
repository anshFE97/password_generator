import { useState } from "react";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import StrengthChecker from "./components/strengthChecker";

interface CheckboxItem {
  title: string;
  state: boolean;
}

const App = () => {
  const [length, setLength] = useState<number>(4);
  const [checkboxData, setCheckboxData] = useState<CheckboxItem[]>([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState<Boolean>(false)

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {/* Password text and copy button */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      {/* Character length */}
      <div className="charLength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={handleLengthChange}
        />
      </div>
      {/* Checkbox */}
      <div className="checkboxes">
        {checkboxData.map((data, i) => (
          <div key={i}>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(i)}
              checked={data.state}
            />
            <label>{data.title}</label>
          </div>
        ))}
      </div>
      {/* Strength */}
      <StrengthChecker password={password} />
      {/* Error handeling */}
      {errorMessage && (
        <div className="errorMessage">{errorMessage}</div>
      )}
      {/* Generate button */}
      <button className="generateBtn" onClick={() => generatePassword(checkboxData, length)}>
        Generate password
      </button>
    </div>
  );
};
export default App;
