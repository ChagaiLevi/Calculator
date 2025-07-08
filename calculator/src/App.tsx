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
  const [history, setHistory] = useState<any>(localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history') || '') : []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const calculation: () => void = () => {
    try {
      const checkResult = evaluate(exercise);
      setExercise(exercise.replace(/\s/g, '').replace(/([+\-*/])/g, ' $1 '));
      setResult(checkResult);
      let day: number | string = new Date().getDate();
      let month: number | string = new Date().getMonth() + 1;
      let mintues: number | string = new Date().getMinutes();
      let hours: number | string = new Date().getHours();

      if (mintues.toString().length === 1) {
        mintues = `0${mintues}`;
      }
      if (hours.toString().length === 1) {
        hours = `0${hours}`;
      }
      if (day.toString().length === 1) {
        day = `0${day}`;
      }
      if (month.toString().length === 1) {
        month = `0${month}`;
      }

      setHistory([...history, {
        exercise: exercise.replace(/\s/g, '').replace(/([+\-*/])/g, ' $1 '),
        result: checkResult,
        id: history.length + 1,
        data: {
          time: `${hours}:${mintues}`,
          date: `${new Date().getDate()}/${month}/${new Date().getFullYear()}`
        }
      }]);
    }
    catch (error) {
      setResult(null);
    }
  }
  return (
    <div>
      <HistoryBtn setOpenHistoryPage={setOpenHistoryPage} />
      <HistoryPage history={history} setOpenHistoryPage={setOpenHistoryPage} openHistroyPage={openHistroyPage} />
      <Calculator exercise={exercise} setExercise={setExercise} result={result} calculation={calculation} exerciseBoolean={exerciseBoolean} setExerciseBoolean={setExerciseBoolean} />
      <Copyright />
    </div>
  );
}

export default App;
