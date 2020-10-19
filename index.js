/*****************
 *               *
 *     NAVBAR    *
 *               *
 * * * * * * * * */

let menu = document.querySelector(".menu");
menu.addEventListener("click", function () {
    document.querySelector("nav").classList.toggle("responsive");
})


/** * * * * * * * * * * * * *
*                           *
*            GAME           *
*                           *
* * * * * * * * * * * * * * */

let userPattern = [];
let gamePattern = [];
let isStarted = false;
let level = 0;
let buttons = document.querySelectorAll(".box");
let startBtn = document.querySelector(".start-btn");
let header = document.querySelector(".level");
let main = document.querySelector("main");

function btnAnimation(index) {
    buttons[index].classList.toggle("box-pressed");
    setTimeout(function () {
        buttons[index].classList.toggle("box-pressed");
    }, 100);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    let x = audio.play();
}

startBtn.addEventListener("click", function () {
    if (!isStarted) {
        startBtn.classList.add("hidden");
        isStarted = true;
        nextLevel();
    }
})

function nextLevel() {
    level++;
    userPattern = [];
    header.textContent = "Level " + level;
    let randomNum = Math.floor(Math.random() * buttons.length);
    btnAnimation(randomNum);
    gamePattern.push(buttons[randomNum]);
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        btnAnimation(i);
        userPattern.push(buttons[i]);
        checkAnswer(userPattern.length - 1);
    })
}

function checkAnswer(index) {
    if (userPattern[index] === gamePattern[index]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextLevel();
            }, 1000);
        }
    } else {
        main.classList.toggle("game-over");
        header.textContent = "Game Over!"
        playSound("wrong");
        setTimeout(function () {
            main.classList.toggle("game-over");
        }, 300);
        restart();
    }
}

function restart() {
    isStarted = false;
    level = 0;
    gamePattern = [];
    userPattern = [];
    startBtn.classList.remove("hidden");
    startBtn.textContent = "Restart";
}
