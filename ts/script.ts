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

localStorage.getItem('histroy') != null ? each() : null;


function each(): void {
  historyObject.forEach((exercise: any, index: number) => {

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

function exerciseFunctin(): void {
  let exerciseF: string = exerciseId.value;
  let exercise: string = exerciseF.replace(/\s/g, '').replace(/([+\-*/])/g, ' $1 ');
  let text: string;
  let result: number = eval(exercise);

  exerciseId.value = '';

  text = `${exercise} = ${result}`;

  let day: number | string = new Date().getDate();
  let month: number | string = new Date().getMonth() + 1;

  day.toString().length === 1 ? day = `0${day}` : null;
  month.toString().length === 1 ? month = `0${month}` : null;

  historyObject.unshift({
    exercise,
    result,
    date: {
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      date: `${day}/${month}/${new Date().getFullYear()}`
    }
  },);

  historyObject.length === 7 ? historyObject.pop() : null;

  each();


  let history = JSON.stringify(historyObject);
  localStorage.setItem('histroy', history);

  textId.innerHTML = text;
}