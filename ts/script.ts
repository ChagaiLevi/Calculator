const exerciseId: HTMLInputElement = document.querySelector('.exercise') as HTMLInputElement;
const textId: HTMLParagraphElement = document.querySelector('.text') as HTMLParagraphElement;
const histroyId: HTMLDivElement = document.querySelector('.history') as HTMLDivElement;
let informer: boolean = false;

let historyObject: any;
let historyL: any = localStorage.getItem('histroy');

if (historyL === null || historyL === undefined || historyL === '[object Object]') {
  historyObject = [];
}
else {
  historyObject = JSON.parse(historyL);
}

if (localStorage.getItem('histroy') != null) {
  each();
}
for (let i = 0; i < historyObject.length; i++) {
  checkInfor(i + 1);
}

function each(): void {
  historyObject.forEach((exercise: any, index: number) => {
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

    if (exercise.star) {
      onStarsMouseover('star', i);
    }
  });
}

exerciseId.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    exerciseFunctin();
  }
});

function exerciseFunctin(): void {
  let exerciseF: string = exerciseId.value;
  let exercise: string = exerciseF.replace(/\s/g, '');
  let text: string;

  exercise = exercise.replace(/([+\-*/])/g, ' $1 ');
  let result: number = eval(exercise);

  exerciseId.value = '';

  text = `${exercise} = ${result}`;

  let day: number | string = new Date().getDate();
  let month: number | string = new Date().getMonth() + 1;

  if (day.toString().length === 1) day = `0${day}`;
  if (month.toString().length === 1) month = `0${month}`;

  historyObject.unshift({
    exercise,
    result,
    star: false,
    date: {
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      date: `${day}/${month}/${new Date().getFullYear()}`
    }
  },);

  if (historyObject.length === 7) {
    historyObject.pop();
  }

  each();

  for (let i = 0; i < historyObject.length; i++) {
    checkInfor(i + 1);
  }

  let history = JSON.stringify(historyObject);
  localStorage.setItem('histroy', history);

  textId.innerHTML = text;
}

function onStarsMouseover(type: string, number: number) {
  const starElem: HTMLElement = document.querySelector(`.star${number}`) as HTMLElement;
  const checkElem: HTMLElement = document.querySelector(`.check${number}`) as HTMLElement;

  if (type === 'star') {
    checkElem.innerHTML = `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
    starElem.style.display = 'none';
    checkElem.style.display = '';
    historyObject[number - 1].star = true;
    let history = JSON.stringify(historyObject);
    localStorage.setItem('histroy', history);
  }
}

function onStarsMouseleave(type: string, number: number) {
  if (informer) {
    return;
  }

  const starElem: HTMLElement = document.querySelector(`.star${number}`) as HTMLElement;
  const checkElem: HTMLElement = document.querySelector(`.check${number}`) as HTMLElement;

  historyObject[number - 1].star = false;
  let history = JSON.stringify(historyObject);
  localStorage.setItem('histroy', history);

  if (type === 'check') {
    checkElem.style.display = 'none';
    starElem.style.display = '';
  }
}

function checkInfor(number: number): void {
  const checkElem: HTMLElement = document.querySelector(`.check${number}`) as HTMLElement;

  checkElem.addEventListener('click', () => informer != true ? informer = true : informer = false);
}