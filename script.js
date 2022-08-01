let randomNumber = Math.floor(Math.random() * 101);
console.log(randomNumber);
const submit = document.querySelector("#button")
const inputField = document.querySelector("#guess")
const numText = document.querySelector("#num")
const lowHi = document.querySelector("#lowHi")
const pastGuesses = document.querySelector("#attempt")
let guesses = 0
let previousGuesses = []

submit.addEventListener("click", function(e) {
  const guess = parseInt(inputField.value);
  nancheck(guess)
})

function nancheck(guess) {
  if (isNaN(guess)) {
    alert("That is not a valid guess");
  } else if (guess < 1) {
    alert("Enter a number greater than 1")
  } else if (guess > 100) {
    alert("Enter a number less than 100")
  } else {

    previousGuesses.push(guess);
    checkGuess(guess)
    showGuess(guess)
    if (guesses === 9) {
      endMessage(`You got it! The number was ${randomNumber}`)
    }
  }
}

function showGuess(guess) {
  guesses++;
  console.log(guesses);
  numText.innerHTML = `<h1>Attempt remaining : ${10 - guesses}</h1>`;
  inputField.value = ""
  pastGuesses.innerHTML += `${guess} `
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    endMessage("Correct! You Win")
  } else if (guess < randomNumber) {
    endMessage("Too low! Try again")
  } else if (guess > randomNumber) {
    endMessage("Too high! Try again")
  }
}

function endMessage(message) {
  lowHi.innerHTML = `<h1>${message}</h1>`
}
