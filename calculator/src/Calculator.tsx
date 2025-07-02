const Calculator: React.FC<{ exercise: string, setExercise: React.Dispatch<React.SetStateAction<string>>, result: number | null }> = ({ exercise, setExercise, result }) => {
  return (
    <div className="mainContainer">
      <div>Please enter an exercise and then press enter:</div>
      <input type="text" className="exercise" placeholder="Type here..." maxLength={33} minLength={3} onChange={(e) => setExercise(e.target.value)} />
      <p className="text">{result ? result : 0}</p>
    </div>
  )
}

export default Calculator