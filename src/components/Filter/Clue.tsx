import { FC } from "react";

interface ClueProps {
  inputClue: string[];
  setInput: (e: string) => void;
  showInputClue: boolean;
  setShowInputClue: (e: boolean) => void;
}

const Clue: FC<ClueProps> = ({
  inputClue,
  setInput,
  showInputClue,
  setShowInputClue,
}) => {
  return (
    <div
      className="input-clue"
      style={showInputClue ? { display: "block" } : { display: "none" }}
    >
      {inputClue.length > 0 ? (
        inputClue.map((item: string) => {
          return (
            <div
              key={item}
              className="clue"
              onClick={() => {
                setInput(item);
                setShowInputClue(false);
              }}
            >
              {item}
            </div>
          );
        })
      ) : (
        <h3 className="clue-error-message">
          Товар не найден! Проверте правильность ввода
        </h3>
      )}
    </div>
  );
};

export default Clue;
