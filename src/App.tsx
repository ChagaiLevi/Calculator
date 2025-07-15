//import React from 'react';
import HistoryBtn from './HistoryBtn';
import HistoryPage from './HistoryPage';
import Calculator from './Calculator';
import Copyright from './Copyright';
import { useState, useEffect } from 'react';
import { evaluate } from "mathjs";
import axios, { type AxiosResponse } from 'axios';
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
  const API_URL: string = 'http://localhost:3500/history';
  const [exercise, setExercise] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [openHistroyPage, setOpenHistoryPage] = useState<boolean>(false);
  const [isApiAvailable, setIsApiAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [history, setHistory] = useState<HistoryListProps[]>([]);

  useEffect(() => {
    const delayLoad = setTimeout(() => {
      setIsLoading(false);

      checkApiAvailability().then((isAvailable) => {
        setIsApiAvailable(isAvailable);
        if (isAvailable) {
          fetchItems();
        }
        else {
          setIsApiAvailable(false);
        }
      });
    }, 2000);

    return () => clearTimeout(delayLoad);
  }, []);


  const removeHistory: (id: string) => Promise<boolean> = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setHistory(history.filter((item: HistoryListProps) => item.id !== id));
      return true;
    } catch {
      return false;
    }
  };


  const checkApiAvailability = async () => {
    try {
      return true;
    } catch (error: unknown) {
      return false;
    }
  };

  const fetchItems: () => Promise<void> = async () => {
    try {
      const response: AxiosResponse<HistoryListProps[]> = await axios.get(API_URL);
      setHistory(response.data);
    }
    catch (err) {
      console.error('Error history items:', err);
      setHistory([]);
    }
  };

  const calculation: () => void = async () => {
    try {
      let exerciseText: string = exercise.replace(/\s/g, '').replace(/([+\-*/])/g, ' $1 ');
      if (history.length !== 0 && exerciseText === history[history.length - 1].exercise) return;
      const checkResult = evaluate(exercise);
      setExercise(exerciseText);
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

      const newHistoryItem: HistoryListProps = {
        exercise: exerciseText,
        result: checkResult,
        id: uuidv4(),
        data: {
          time: `${hours}:${mintues}`,
          date: `${new Date().getDate()}/${month}/${new Date().getFullYear()}`
        }
      }

      if (!isApiAvailable) {
        setHistory([...history, newHistoryItem]);
      }
      else {
        let response: AxiosResponse<HistoryListProps> = await axios.post(API_URL, newHistoryItem);
        setHistory([...history, response.data]);
      }
    }
    catch (error) {
      setResult(null);
    }
  }
  return (
    <div>
      <HistoryBtn setOpenHistoryPage={setOpenHistoryPage} />
      <HistoryPage history={history} setOpenHistoryPage={setOpenHistoryPage} openHistroyPage={openHistroyPage} isLoading={isLoading} isApiAvailable={isApiAvailable} removeHistory={removeHistory} />
      <Calculator exercise={exercise} setExercise={setExercise} result={result} calculation={calculation} />
      <Copyright />
    </div>
  );
}

export default App;
