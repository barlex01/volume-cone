

let randomNum = Math.floor(Math.random()* 100) + 1;

let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');

let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');
let wrapperInput = document.querySelector('.wrapper__input');
let guessCount = 1;
let resetButton;


function checkGuess() {
   let userGuess = Number(guessField.value);
   if (guessField === 1 ) {
       guesses.textContent = 'Previous guesses';
   }
   guesses.textContent += `${userGuess} ` ;
   
   if (userGuess === randomNum) {

       lastResult.textContent = 'Congratulations!!! You got it right!!! ';
       lastResult.classList.toggle('green');
       lowOrHi.textContent = ' ';
       setGameOver();

   } else if (guessCount === 10) {
       lastResult.textContent = 'Sorry!!! The game is over';
       setGameOver();
   } else{
       lastResult.textContent = 'Wrong!!!';
       lastResult.classList.toggle('red');
       if (userGuess < randomNum) {
           lowOrHi.textContent = 'Last guess was too low';

       }else if (userGuess > randomNum) {
           lowOrHi.textContent = 'Last guess was to hight';
       }
   }

    guessCount++;
    guessField.value = '';
    guessField.focus();

}
guessSubmit.addEventListener('click', checkGuess);


function setGameOver() {

    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.classList.toggle('center')
    resetButton.textContent = 'Start new game';
    wrapperInput.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame)

}
function resetGame() {
    guessCount = 1;
    let resetParas = document.querySelectorAll('.resultParas p');

    for (let res of resetParas) {
        res.textContent = '';

    }
    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.classList.toggle('white');
    randomNum = Math.floor(Math.random() * 100) +1;
}