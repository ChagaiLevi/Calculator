import HistoryBtn from './Components/HistoryBtn';
import HistoryPage from './Components/HistoryPage';
import Calculator from './Components/Calculator';
import Copyright from './Components//Copyright';
import { useEffect, useState } from 'react';
import { evaluate } from "mathjs";
import { v4 as uuidv4 } from 'uuid';

export type HistoryListProps = {
  data: {
    date: string;
    time: string;
  },
  exercise: string;
  result: number;
  id: string;
}

function App() {
  const [exercise, setExercise] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [openHistroyPage, setOpenHistoryPage] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryListProps[]>(localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history') as string) : []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const removeHistory: (id: string) => boolean = (id: string) => {
    try {
      history.find((item: HistoryListProps) => item.id === id);
      setHistory(history.filter((item: HistoryListProps) => item.id !== id));
      return true;
    } catch {
      return false;
    }
  };

  const calculation: () => void = async () => {
    try {
      let exerciseText: string = exercise.replace(/\s/g, '').replace(/([+\-*/])/g, ' $1 ');
      if (history.length !== 0 && exerciseText === history[history.length - 1].exercise) return;
      const checkResult = evaluate(exercise);
      setExercise(exerciseText);
      setResult(checkResult);

      const date: Date = new Date();
      let day: number | string = date.getDate();
      let month: number | string = date.getMonth() + 1;
      let mintues: number | string = date.getMinutes();
      let hours: number | string = date.getHours();
      const year: number = date.getFullYear();

      mintues.toString().length === 1 && (mintues = `0${mintues}`);
      hours.toString().length === 1 && (hours = `0${hours}`);
      day.toString().length === 1 && (day = `0${day}`);
      month.toString().length === 1 && (month = `0${month}`);

      const newHistoryItem: HistoryListProps = {
        exercise: exerciseText,
        result: checkResult,
        id: uuidv4(),
        data: {
          time: `${hours}:${mintues}`,
          date: `${day}/${month}/${year}`
        }
      }

      setHistory([...history, newHistoryItem]);
    }
    catch (error: unknown) {
      setResult(null);
    }
  }
  return (
    <div>
      <HistoryBtn setOpenHistoryPage={setOpenHistoryPage} />
      <HistoryPage history={history} setOpenHistoryPage={setOpenHistoryPage} openHistroyPage={openHistroyPage} removeHistory={removeHistory} />
      <Calculator exercise={exercise} setExercise={setExercise} result={result} calculation={calculation} />
      <Copyright />
    </div>
  );
}

export default App;
