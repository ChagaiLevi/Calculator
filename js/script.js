"use strict";
const exerciseId = document.querySelector('.exercise');
const textId = document.querySelector('.text');
const histroyId = document.querySelector('.history');
let informer = false;
let historyObject;
let historyL = localStorage.getItem('histroy');
if (historyL === null || historyL === undefined || historyL === '[object Object]') {
    historyObject = [];
}
else {
    historyObject = JSON.parse(historyL);
}
localStorage.getItem('histroy') != null ? each() : null;
function each() {
    historyObject.forEach((exercise, index) => {
        if (index === 0) {
            histroyId.innerHTML = '';
        }
        histroyId.innerHTML += `
      <div class="table-row">
        <div class="content">
          <div class="date">${exercise.date.date}, ${exercise.date.time}</div>
          <div>${exercise.exercise} = ${exercise.result}</div>
        </div>
      </div>
    `;
    });
}
exerciseId.addEventListener('keypress', (event) => {
    event.key === 'Enter' ? exerciseFunctin() : null;
});
function exerciseFunctin() {
    let exerciseF = exerciseId.value;
    let exercise = exerciseF.replace(/\s/g, '');
    let text;
    exercise = exercise.replace(/([+\-*/])/g, ' $1 ');
    let result = eval(exercise);
    exerciseId.value = '';
    text = `${exercise} = ${result}`;
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    day.toString().length === 1 ? day = `0${day}` : null;
    month.toString().length === 1 ? month = `0${month}` : null;
    historyObject.unshift({
        exercise,
        result,
        date: {
            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
            date: `${day}/${month}/${new Date().getFullYear()}`
        }
    });
    historyObject.length === 7 ? historyObject.pop() : null;
    each();
    let history = JSON.stringify(historyObject);
    localStorage.setItem('histroy', history);
    textId.innerHTML = text;
}
