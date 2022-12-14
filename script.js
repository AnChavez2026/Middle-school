const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
let randomNumber = getRandomInt(100)
console.log(randomNumber);
const submit = document.querySelector("#button")
const inputField = document.querySelector("#guess")
const numText = document.querySelector("#num")
const lowHi = document.querySelector("#lowHi")
const pastGuesses = document.querySelector("#attempt")
const newGameButton = document.querySelector("#button2");
const unhide = document.querySelector("#unhide");
const imageHolderDiv = document.querySelector("#imageholder");
const up = document.querySelector("#color")
const bottom = document.querySelector("#color2")
let guesses = 0;
let winURL = "https://api.giphy.com/v1/gifs/search?api_key=N1Q0iOh5AufGTWWzFtw1awPYg21xiZRp&q=winner&limit=25&offset=0&rating=g&lang=en";
let lURL = "https://api.giphy.com/v1/gifs/search?api_key=N1Q0iOh5AufGTWWzFtw1awPYg21xiZRp&q=loser&limit=25&offset=0&rating=g&lang=en";
let win = false;
submit.addEventListener("click", function(e) {
  const guess = parseInt(inputField.value);
  nancheck(guess);
  winCheck()
})

function nancheck(guess) {
  if (isNaN(guess)) {
    alert("That is not a valid guess");
  } else if (guess < 1) {
    alert("Enter a number greater than 1")
  } else if (guess > 100) {
    alert("Enter a number less than 100")
  } else {
    checkGuess(guess)
    showGuess(guess)
    // if (guesses === 5) {
    //   //document.body.style.background = "#72ade3";
    //   up.classList.remove("is-link")
    //   up.classList.add("is-warning")
    //   bottom.classList.remove("has-background-link")
    //   bottom.classList.add("has-background-warning")
    // } 
    if (guesses === 8) {
      //document.body.style.background = "#ffef85";
      up.classList.remove("is-link")
      up.classList.add("is-primary")
      bottom.classList.remove("has-background-link")
      bottom.classList.add("has-background-primary")
    }
    if (guesses === 9) {
      //document.body.style.background = "orange";
      up.classList.remove("is-primary")
      up.classList.add("is-warning")
      bottom.classList.remove("has-background-primary")
      bottom.classList.add("has-background-warning")
    }
    if (guesses === 10) {
      endMessage(`Game Over! The number was ${randomNumber}`)
      checkGuess(guess)
      gameOver()
      up.classList.remove("is-warning")
      up.classList.add("is-danger")
      bottom.classList.remove("has-background-warning")
      bottom.classList.add("has-background-danger")
    }
  }
}

function showGuess(guess) {
  guesses++;
  console.log(guesses);
  numText.innerHTML = `<h1>Attempt remaining : ${10 - guesses}</h1>`;
  inputField.value = ""
  pastGuesses.innerHTML += `${guess}, `;
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    endMessage(`Correct! You Win, the number was ${randomNumber}`)
    gameOver()
    win = true;
  } else if (guess < randomNumber) {
    endMessage("Too low! Try again")
  } else if (guess > randomNumber) {
    endMessage("Too high! Try again")
  }
}

function endMessage(message) {
  lowHi.innerHTML = `<h1>${message}</h1>`;
}

function gameOver() {
  inputField.setAttribute("disabled", "");
  button.setAttribute("disabled", "");
  //newGameButton.innerHTML
  unhide.classList.remove("section")
  unhide.classList.remove("hidden")
  //.innerHTML = 'Press "start over" to restart the game!'
  newGameButton.addEventListener("click", function() {
    inputField.removeAttribute("disabled")
    button.removeAttribute("disabled")
    lowHi.innerHTML = ""
    guesses = 0
    pastGuesses.innerHTML = ""
    numText.innerHTML = `<h1>Attempt remaining : 10</h1>`;
    document.getElementById("gif").classList.add("hidden");
    randomNumber = getRandomInt(100);
    unhide.classList.add("section")
    unhide.classList.add("hidden")
    console.log("new num", randomNumber)
    document.body.style.background = "white"
    up.classList.remove("is-danger")
    up.classList.add("is-link")
    bottom.classList.remove("has-background-danger")
    bottom.classList.add("has-background-link")
    win = false; 
  })
}
// checks if the users has won and if guesses = 10, shows gifs for a win and lost 
async function winCheck() {
  if (win == false && guesses == 10) {
    const response = await fetch(lURL);
    const json = await response.json();
    let i = getRandomInt(25);
    const gifURL = json.data[i].images.downsized.url;
    document.getElementById("gif").classList.remove("hidden");
    imageHolderDiv.innerHTML = `<img src = ${gifURL} alt="gif" class = "center"/>`
  }
  else if (win == true) {
    const response = await fetch(winURL);
    const json = await response.json();
    let i = getRandomInt(25);
    const gifURL = json.data[i].images.downsized.url;
    document.getElementById("gif").classList.remove("hidden");
    imageHolderDiv.innerHTML = `<img src = ${gifURL} alt="gif" class = "center"/>`;
  }
}