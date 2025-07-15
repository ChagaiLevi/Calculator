import { useState } from "react"

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