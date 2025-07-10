//import React from 'react';
import HistoryBtn from './HistoryBtn';
import HistoryPage from './HistoryPage';
import Calculator from './Calculator';
import Copyright from './Copyright';
import React, { useState, useEffect } from 'react';
import { composition, evaluate, re } from "mathjs";
import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

//npx json-server -p 3500 -w data/db.json 

function App() {
  const API_URL: string = 'http://localhost:3500/history';
  const [exercise, setExercise] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [openHistroyPage, setOpenHistoryPage] = useState<boolean>(false);
  const [exerciseBoolean, setExerciseBoolean] = useState<boolean>(false);
  const [isApiAvailable, setIsApiAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [history, setHistory] = useState<any>([]);

  useEffect(() => {
    // עיכוב של 3 שניות לפני בדיקת ה-API וטעינת ההיסטוריה
    const delayLoad = setTimeout(() => {
      setIsLoading(false);

      checkApiAvailability().then((isAvailable) => {
        setIsApiAvailable(isAvailable);
        if (isAvailable) {
          fetchItems(); // טען היסטוריה מה-API
        }
        else {
          setIsApiAvailable(false);
        }
      });
    }, 3000); // עיכוב של 3 שניות

    // ניקוי ה-timeout אם הקומפוננטה מפורקת
    return () => clearTimeout(delayLoad);
  }, []);



  const checkApiAvailability = async () => {
    try {
      let response: any = await axios.head(API_URL);
      //return response.status >= 200 && response.status < 300;
      return true;
    } catch (error: any) {
      return false;
    }
  };

  const fetchItems: any = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(API_URL);
      setHistory(response.data);
    }
    catch (err) {
      console.error('Error history items:', err);
      setHistory([]);
    }
  };

  const calculation: () => void = async () => {
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

      const newHistoryItem: any = {
        exercise: exercise.replace(/\s/g, '').replace(/([+\-*/])/g, ' $1 '),
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
        let response: AxiosResponse<any> = await axios.post(API_URL, newHistoryItem);
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
      <HistoryPage history={history} setOpenHistoryPage={setOpenHistoryPage} openHistroyPage={openHistroyPage} isLoading={isLoading} isApiAvailable={isApiAvailable} />
      <Calculator exercise={exercise} setExercise={setExercise} result={result} calculation={calculation} exerciseBoolean={exerciseBoolean} setExerciseBoolean={setExerciseBoolean} />
      <Copyright />
    </div>
  );
}

export default App;
