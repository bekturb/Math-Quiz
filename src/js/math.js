import {MathResult} from "./result";
import {sections} from "./player";

const mathUser = document.querySelector('.math__user')
const mathStop = document.querySelector('.math__stop')
const num1 = document.querySelector('.math__num-1')
const operator = document.querySelector('.math__operator')
const num2 = document.querySelector('.math__num-2')
const result = document.querySelector('.math__result')
const winElement = document.querySelector('.center__win')
const scoreTitle = document.querySelector('.center__score')
const scoreNumber = document.querySelector('.center__win')
const scoreStatus = document.querySelector('.center__add')
const mathTimer = document.querySelector('.math__timer')
const mathMain = document.querySelector('.math__main')
const mathMinute = document.querySelector('.math__minute')
const mathSeconds = document.querySelector('.math__second')
const dots = document.querySelector('.math__dots')

let win = 0
let correct = 0;
let inCorrect = 0;
let time = 20;
let timer;
let gameUser = {
    name: "",
    mode: "",
    score: "",
    correctScore: "",
    inCorrectScore: "",
}
export const math = (user, mode) => {
    gameUser.name = user
    gameUser.mode = mode
    mathUser.innerHTML = user
    startGame(user, mode)
}

mathStop.addEventListener("click", () => {
    sections.forEach(el => {
        el.style.transform = `translateY(-2100px)`
    })
    stopGame()
})

export const startTimer = (user, mode) => {
    timer = setInterval(updateCountDown, 1000);

    function updateCountDown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        mathMinute.innerHTML = `${minutes}`
        mathSeconds.innerHTML = `${seconds}`
        dots.innerHTML = `:`
        time--
        if (time < 0) {
            stopGame(user, mode)
        }
    }
}

export function startGame(user, mode) {
    if (mode === "attack") {
        mathTimer.style.display = "block"
        startTimer(user, mode)
    }else{
        mathTimer.style.display = "none"
    }

    const getRandom = (min, max) => {
        return Math.round(Math.random() * (max - min) + min)
    }

    const operators = ['+', '-', '*', '/']

    const sum = (a, b, operator) => {
        if (operator === '+') return a + b
        if (operator === '-') return a - b
        if (operator === '/') return a / b
        return a * b
    }

    const generateExample = () => {
        const num1 = getRandom(1, 10)
        const num2 = getRandom(1, 10)
        const operator = operators[getRandom(0, 3)]
        const result = sum(num1, num2, operator)

        if (operator === "/") {
            const num2 = getRandom(1, 10);
            const num1 = num2 * getRandom(1, 10);
            const result = sum(num1, num2, operator);
            return {num1, num2, operator, result};
        }

        return {num1, num2, operator, result}
    }

    const renderExample = (data) => {
        num1.textContent = data.num1
        num2.textContent = data.num2
        operator.textContent = data.operator
    }

    mathMain.classList.add("move-right")
    setTimeout(() => {
        mathMain.classList.remove("move-right")
    }, 1000)

    let example = generateExample()
    renderExample(example)


    result.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            if (!result.value && result.value !== 0) return

            mathMain.classList.add("move-left")
            setTimeout(() => {
                mathMain.classList.remove("move-left")
                mathMain.classList.add("move-right")
            }, 1000)
            mathMain.classList.remove("move-right")

            if (Number(result.value) === Number(example.result)) {
                win += 1
                correct += 1
                scoreStatus.classList.add("up-result")
                scoreStatus.innerHTML = '+1'
                setTimeout(() => {
                    scoreStatus.classList.remove("up-result")
                    scoreStatus.innerHTML = ''
                }, 1500)

            } else {
                win -= 1
                inCorrect -= 1
                scoreTitle.classList.add("score-move")
                scoreNumber.classList.add("score-move")
                scoreStatus.classList.add("down-result")
                scoreStatus.innerHTML = '-1'
                setTimeout(() => {
                    scoreTitle.classList.remove("score-move")
                    scoreNumber.classList.remove("score-move")
                    scoreStatus.classList.remove("down-result")
                    scoreStatus.innerHTML = ''
                }, 1500)
            }
            winElement.textContent = win
            result.value = ''
            example = generateExample()
            renderExample(example)
        }
    })
}

function stopGame() {
    gameUser.score = win
    gameUser.correctScore = correct
    gameUser.inCorrectScore = inCorrect
    sections.forEach(el => {
        el.style.transform = `translateY(-2100px)`
    })
    MathResult(gameUser)
    clearInterval(timer)
    correct = 0
    inCorrect = 0
    win = 0
    time = 20
    winElement.textContent = 0
    result.value = ''
}