let randomNumber = Math.floor(Math.random() * 101);
console.log(randomNumber);
const submit = document.querySelector("#button")
const inputField = document.querySelector("#guess")
const numText = document.querySelector("#num")
const lowHi = document.querySelector("#lowHi")
let guesses = 0
let previousGuesses = []

submit.addEventListener("click", function(e){
  const guess = parseInt(inputField.value);
  nancheck(guess)
})

function nancheck(guess) {
  if (isNaN(guess)){
    alert("That is not a valid guess");
  } else if (guess < 1) {
    alert("Enter a number greater than 1")
  } else if (guess > 100) {
    alert("Enter a number less than 100")
  } else {
    previousGuesses.push(guess);
    checkGuess(guess)
  } 
}

function checkGuess(guess){
  if (guess ===randomNumber){
    endMessage("Correct! You Win")
  } else if (guess < randomNumber){
    endMessage("Too low! Try again")
  }else if (guess > randomNumber){
    endMessage("Too high! Try again")
  }
}

function endMessage(message){
}
// // For the past guesses part(?), but this one is for images we might need to change it to numbers later
// imageHolderDiv.innerHTML = `<img src="${imgurl}"/>` + imageHolderDiv.innerHTML;
