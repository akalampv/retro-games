/* LIST OF USER CLICKED BUTTONS */
let userPattern = [];

/* LIST OF CLICKED BUTTONS */
let gamePattern = [];

/* GAME LEVEL */
let level = 0;

/* IS GAME STARTED */
let started = false;

/* HEADER ELEMENT */
let header = document.querySelector(".header");

/* LIST OF ALL BUTTONS */
let buttons = document.querySelectorAll(".box");

/* FLASH BUTTON */
function flash(index) {
    buttons[index].classList.toggle("box-pressed");
    setTimeout(function () {
        buttons[index].classList.toggle("box-pressed");
    }, 100);
}

/* PLAY SOUND */
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    let x = audio.play();
}

/* CLICK ANIMATION */
function clickAnimation(index) {
    flash(index);
    playSound(index);
}

/* START GAME */
document.addEventListener("keydown", function () {
    if (!started) {
        document.querySelector(".header").textContent = "Level " + level;
        started = true;
        nextSequence();
    }
})


/* PERFORM ROUND */
function nextSequence() {
    userPattern = [];
    level++;
    header.textContent = "Level " + level;
    let randomIndex = Math.floor(Math.random() * buttons.length);
    clickAnimation(randomIndex);
    gamePattern.push(buttons[randomIndex]);
}

/* PLAY */
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        clickAnimation(i);
        userPattern.push(buttons[i]);
        checkAnswer(userPattern.length - 1);
    })
}

/* CHECK FOR WIN */
function checkAnswer(index) {
    if (userPattern[index] === gamePattern[index]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        document.querySelector("body").classList.toggle("game-over");
        playSound("wrong");
        setTimeout(function () {
            document.querySelector("body").classList.toggle("game-over");
            header.innerHTML = "Game Over!<br>Press any key to restart";
        }, 300);
        restart();
    }
}

/* RESTART GAME */
function restart() {
    started = false;
    level = 0;
    gamePattern = [];
    userPattern = [];
}
