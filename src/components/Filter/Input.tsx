import { FC, useState } from "react";
import { ClickAwayListener } from "@mui/material";
import Clue from "./Clue";

interface InputProps {
  input: string;
  setInput: (e: string) => void;
  uniqFields: string[];
}

const Input: FC<InputProps> = ({ input, setInput, uniqFields }) => {
  const [inputClue, setInputClue] = useState<string[]>([]);
  const [showInputClue, setShowInputClue] = useState<boolean>(false);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    value.length > 0 ? setShowInputClue(true) : setShowInputClue(false);

    let filterPossibleValues;
    if (value.length > 0) {
      filterPossibleValues = uniqFields.filter((item: string) => {
        if (typeof item === "number") return String(item).includes(value);
        if (item) {
          return item.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        }
      });
    }
    if (filterPossibleValues) return setInputClue(filterPossibleValues);

    setInput(value);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowInputClue(false);
      }}
    >
      <div className="input-container">
        <label>Товар:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => inputHandler(e)}
          className="input"
        />

        <Clue
          inputClue={inputClue}
          setInput={setInput}
          showInputClue={showInputClue}
          setShowInputClue={setShowInputClue}
        />
      </div>
    </ClickAwayListener>
  );
};

export default Input;
