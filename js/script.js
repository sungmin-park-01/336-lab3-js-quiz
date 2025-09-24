if (localStorage.getItem('tries') === null) {
  localStorage.setItem('tries', '0');
}
// let attempts = localStorage.getItem(attempts);


const POINTS = 20;

function setText(id, ok, msg) {
  let box = document.querySelector('#' + id + ' .feedback');

  let imgOptions = ok ? 'img/correctMark.webp' : 'img/xMark.jpg';
  let img = `<img src="${imgOptions}" alt="${ok ? 'Correct' : 'Incorrect'}"
             style="width:50px; vertical-align:middle; margin-left:6px;">`;

  box.innerHTML = msg + " " + img;

  // box.className = 'feedback ' + (ok ? 'correct' : 'incorrect');
  // box.textContent = msg;
  box.style.color = ok ? 'green' : 'red';
}

document.getElementById('quiz').addEventListener('submit', function (e) {
  e.preventDefault();
  let total = 0;

  // Q1
  let q1choice = document.querySelector('input[name="q1"]:checked');
  let q1 = q1choice ? q1choice.value : '';
  let q1ok = (q1 === 'Mexico City');
  setText('q1', q1ok, q1ok ? 'Correct!' : 'Incorrect. Correct answer: Mexico City');
  if (q1ok) total += POINTS;

  // Q2
  let q2 = (document.querySelector('input[name="q2"]').value || '').toLowerCase();
  let q2ok = (q2 === 'seoul');
  setText('q2', q2ok, q2ok ? 'Correct!' : 'Incorrect. The Capital is "Seoul".');
  if (q2ok) total += POINTS;

  // Q3
  let q3 = document.querySelector('select[name="q3"]').value;
  let q3ok = (q3 === 'Washington DC');
  setText('q3', q3ok, q3ok ? 'Correct!' : 'Incorrect. The correct choice is "Washington DC".');
  if (q3ok) total += POINTS;

  // Q4
  let q4 = Number(document.querySelector('input[name="q4"]').value);
  let q4ok = (q4 === 6);
  setText('q4', q4ok, q4ok ? 'Correct!' : 'Incorrect. We expected 6.');
  if (q4ok) total += POINTS;

  // Q5
  let pickedNodes = document.querySelectorAll('input[name="q5"]:checked');
  let picked = [];
  for (let i = 0; i < pickedNodes.length; i++) {
    picked.push(pickedNodes[i].value);
  }

  let correct = ['Versaille', 'Lyon', 'Rennes'];

  let same = picked.length === correct.length;
  if (same) {
    for (let j = 0; j < correct.length; j++) {
      if (picked.indexOf(correct[j]) === -1) { same = false; break; }
    }
  }

  setText('q5', same, same ? 'Correct: Versaille, Lyon, Rennes.' : 'Incorrect. Correct answers are Versaille, Lyon, Rennes.');
  if (same) total += POINTS;

// score display
  let scoreBox = document.getElementById('scoreBox');
  scoreBox.style.display = 'block';
  scoreBox.textContent = 'Total Score: ' + total + ' / ' + (POINTS * 5);
  if (total >= 80) {
    let msgBox = document.getElementById('messageBox');
    msgBox.style.display = 'block';
    msgBox.textContent = 'Congratulations! You passed the quiz.';
    msgBox.style.color = 'green';
  }

  // attempt count
  let tries = localStorage.getItem('tries');
  tries++;
  localStorage.setItem('tries', tries);
  document.getElementById('attempts').textContent = 'Attempts: ' + tries;
})

document.getElementById('quiz').addEventListener('reset', function () {
  let fb = document.querySelectorAll('.feedback');
  for (let i = 0; i < fb.length; i++) {
    fb[i].textContent = '';
    fb[i].className = 'feedback';
  }

  let cards = document.querySelectorAll('.card');
  for (let j = 0; j < cards.length; j++) {
    cards[j].style.borderColor = 'lightgray';

  localStorage.setItem('tries', 0);
  document.getElementById('attempts').textContent = 'Attempts: ' + 0;
  }

//   let scoreBox = document.querySelector('#scoreBox');
//   scoreBox.style.display = 'none';
//   scoreBox.textContent = POINTS;
});

window.onload = function() {
  let q5 = document.getElementById("q5");

  let labels = q5.querySelectorAll("label");

  let shuffled = _.shuffle(Array.from(labels));

  labels.forEach(lab => lab.remove());

  let feedback = q5.querySelector(".feedback");

  shuffled.forEach(lab => {
    q5.insertBefore(lab, feedback);
    q5.insertBefore(document.createElement("br"), feedback);
  });
};