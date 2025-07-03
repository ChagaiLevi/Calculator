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

  useEffect(() => {
    try {
      const checkResult = evaluate(exercise);
      setResult(checkResult);
    }
    catch (error) {
      setResult(null);
    }
  });
  return (
    <div>
      <HistoryBtn setOpenHistoryPage={setOpenHistoryPage} />
      <HistoryPage setOpenHistoryPage={setOpenHistoryPage} openHistroyPage={openHistroyPage} />
      <Calculator exercise={exercise} setExercise={setExercise} result={result} />
      <Copyright />
    </div>
  );
}

export default App;
