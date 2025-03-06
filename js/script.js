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
for (let i = 0; i < historyObject.length; i++) {
    checkInfor(i + 1);
}
function each() {
    historyObject.forEach((exercise, index) => {
        let i = index + 1;
        if (index === 0) {
            histroyId.innerHTML = '';
        }
        histroyId.innerHTML += `
      <div class="table-row">
        <!--onclick="click(/*);-->
        <div class="star${i} star" onmouseover="onStarsMouseover('star', ${i})"><i class="fa-regular fa-star" style="color: #FFD43B;"></i></div>
        <div class="check${i} check" onmouseover="onStarsMouseover('check', ${i})" onmouseleave="onStarsMouseleave('check', ${i})"> </div>
        <div class="content">
          <div class="date">${exercise.date.date}, ${exercise.date.time}</div>
          <div>${exercise.exercise} = ${exercise.result}</div>
        </div>
      </div>
    `;
        exercise.star ? onStarsMouseover('star', i) : null;
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
        star: false,
        date: {
            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
            date: `${day}/${month}/${new Date().getFullYear()}`
        }
    });
    historyObject.length === 7 ? historyObject.pop() : null;
    each();
    for (let i = 0; i < historyObject.length; i++) {
        checkInfor(i + 1);
    }
    let history = JSON.stringify(historyObject);
    localStorage.setItem('histroy', history);
    textId.innerHTML = text;
}
function onStarsMouseover(type, number) {
    const starElem = document.querySelector(`.star${number}`);
    const checkElem = document.querySelector(`.check${number}`);
    if (type === 'star') {
        checkElem.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
        starElem.style.display = 'none';
        checkElem.style.display = '';
        historyObject[number - 1].star = true;
        let history = JSON.stringify(historyObject);
        localStorage.setItem('histroy', history);
    }
}
function onStarsMouseleave(type, number) {
    if (informer) {
        return;
    }
    const starElem = document.querySelector(`.star${number}`);
    const checkElem = document.querySelector(`.check${number}`);
    historyObject[number - 1].star = false;
    let history = JSON.stringify(historyObject);
    localStorage.setItem('histroy', history);
    if (type === 'check') {
        checkElem.style.display = 'none';
        starElem.style.display = '';
    }
}
function checkInfor(number) {
    const checkElem = document.querySelector(`.check${number}`);
    checkElem.addEventListener('click', () => informer != true ? informer = true : informer = false);
}
