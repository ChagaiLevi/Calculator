//import React from 'react';
import HistoryBtn from './HistoryBtn';
import HistoryPage from './HistoryPage';
import Calculator from './Calculator';
import Copyright from './Copyright';
import React, { useState, useEffect } from 'react';
import { evaluate } from "mathjs";
import { log } from 'console';

function App() {
  const [exercise, setExercise] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [openHistroyPage, setOpenHistoryPage] = useState<boolean>(false);
  const [exerciseBoolean, setExerciseBoolean] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([
    {
      data: {
        date: '04/07/2025',
        time: '18:22'
      },
      exercise: '6 + 6',
      result: 12,
      id: 1
    },
    {
      data: {
        date: '03/05/2024',
        time: '14:15'
      },
      exercise: '3 * 3',
      result: 9,
      id: 2
    },
    {
      data: {
        date: '01/01/2023',
        time: '00:00'
      },
      exercise: '2 * 2',
      result: 4,
      id: 3
    }
  ]);

  const calculation: () => void = () => {
    try {
      const checkResult = evaluate(exercise);
      setExercise(exercise.replace(/\s/g, '').replace(/([+\-*/])/g, ' $1 '));
      setResult(checkResult);
      let day: number | string = new Date().getDate();
      let month: number | string = new Date().getMonth() + 1;

      if (day.toString().length === 1) {
        day = `0${day}`;
      }
      if (month.toString().length === 1) {
        month = `0${month}`;
      }

      console.log(exercise);

      setHistory([...history, {
        exercise,
        result,
        date: {
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
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
