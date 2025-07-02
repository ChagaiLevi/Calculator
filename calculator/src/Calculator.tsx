const Calculator = () => {
  return (
    <div className="mainContainer">
      <div>Please enter an exercise and then press enter:</div>
      <input type="text" className="exercise" placeholder="Type here..." maxLength={33} minLength={3} />
      <p className="text"></p>
    </div>
  )
}

export default Calculator