import React, { useState } from 'react';

type CalculatorProps = {
  exercise: string,
  setExercise: React.Dispatch<React.SetStateAction<string>>,
  result: number | null,
  calculation: () => void,
}

const Calculator: React.FC<CalculatorProps> = ({ exercise, setExercise, result, calculation }) => {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [numberSymbol, setNumberSymbol] = useState<boolean>(false);

  const allowedRegex = /[^0-9+\-*/%()., ]/g;

  const mechanism: (value: string) => boolean = (value) => {
    value = Number(value).toString();
    if (isNaN(Number(value))) return false;
    return true;
  };

  return (
    <div className="containerCopyright">
      <div>Please enter an exercise and then press enter:</div>
      <input
        type="text"
        className="exercise"
        placeholder="Type here..."
        value={exercise}
        maxLength={46}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const val = e.target.value;
          const sanitized = val.replace(allowedRegex, '');
          setExercise(sanitized);
          setShowResult(false);
        }}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            setShowResult(true);
            calculation();
            result !== null && setNumberSymbol(true);
          }
          else if (numberSymbol && mechanism(e.key)) {
            showResult && setShowResult(false);
            setExercise(e.key);
            setNumberSymbol(false);
          }
          else {
            numberSymbol && setNumberSymbol(false);
          }
        }}
        autoFocus
      />
      <p className="text">{showResult && result !== null && `${exercise} = ${result}`}</p>
    </div>
  )
}

export default Calculator;