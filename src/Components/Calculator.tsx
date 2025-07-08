import { useState } from "react"

// ! If i calculated something, and then change the input, the result will still show until i press enter again.
// ! This is because the result state only updates on enter key press.
// ! To fix this, we can create a function to check if the user wants to continue with the current input.
// ! If they do, we show the result, otherwise we hide it until they press enter again.
// ! If the user presses any number again that's says the user wants to start a new calculation, so we hide the result until they press enter again.
// ! WRITE THIS IN NOTION!!!

const Calculator: React.FC<{
  exercise: string,
  setExercise: React.Dispatch<React.SetStateAction<string>>,
  result: number | null,
  calculation: () => void
}> = ({ exercise, setExercise, result, calculation }) => {

  const [exerciseBoolean, setExerciseBoolean] = useState<boolean>(false);

  return (
    <div className="containerCopyright">
      <div>Please enter an exercise and then press enter:</div>
      <input
        type="text"
        className="exercise"
        placeholder="Type here..."
        value={exercise}
        maxLength={46}
        minLength={3}
        onChange={(e) => {
          setExercise(e.target.value);
          setExerciseBoolean(false);
        }}
        onKeyUp={(e) => {
          if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            setExerciseBoolean(true);
            calculation();
          }
        }}
      />
      <p className="text">{result && exerciseBoolean && `${exercise} = ${result}`}</p>

    </div>
  )
}

export default Calculator