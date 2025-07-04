//import React from 'react';
import HistoryBtn from './HistoryBtn';
import HistoryPage from './HistoryPage';
import Calculator from './Calculator';
import Copyright from './Copyright';
import React, { useState, useEffect } from 'react';
import { evaluate } from "mathjs";

function App() {
  const [exercise, setExercise] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [openHistroyPage, setOpenHistoryPage] = useState<boolean>(false);
  const [exerciseBoolean, setExerciseBoolean] = useState<boolean>(false);

  const calculation: () => void = () => {
    try {
      const checkResult = evaluate(exercise);
      setExercise(exercise.replace(/\s/g, '').replace(/([+\-*/])/g, ' $1 '));
      setResult(checkResult);
    }
    catch (error) {
      setResult(null);
    }
  }
  return (
    <div>
      <HistoryBtn setOpenHistoryPage={setOpenHistoryPage} />
      <HistoryPage setOpenHistoryPage={setOpenHistoryPage} openHistroyPage={openHistroyPage} />
      <Calculator exercise={exercise} setExercise={setExercise} result={result} calculation={calculation} exerciseBoolean={exerciseBoolean} setExerciseBoolean={setExerciseBoolean} />
      <Copyright />
    </div>
  );
}

export default App;
