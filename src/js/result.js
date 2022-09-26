import {sections} from "./player";
import {leadBoard} from "./leadboard";

const resultPrev = document.querySelector('.result__prev')
const leadButton = document.querySelector('.result__btn--lead')
const replay = document.querySelector('.result__btn--replay')
const resultScore = document.querySelector('.result__score')
const correctScore = document.querySelector('.result__amount')
const inCorrectScore = document.querySelector('.result__incorrect-amount')

export const MathResult = (gameUser) => {
    resultScore.innerHTML = gameUser.score
    correctScore.innerHTML = gameUser.correctScore > 0 ? gameUser.correctScore : "0"
    inCorrectScore.innerHTML = gameUser.inCorrectScore > 0 ? gameUser.inCorrectScore : "0"
    setLocalStorage(gameUser)
}

leadButton.addEventListener("click", () => {
    sections.forEach(el => {
        el.style.transform = `translateY(-2800px)`
    })
    leadBoard()
})

resultPrev.addEventListener("click", () => {
    sections.forEach(el => {
        el.style.transform = `translateY(-700px)`
    })
})

replay.addEventListener("click", () => {
    sections.forEach(el => {
        el.style.transform = `translateY(-700px)`
    })
})

export function getUsers() {
    const gamePlayers = localStorage.getItem("users")
    if (gamePlayers !== null){
        return JSON.parse(gamePlayers)
    }else{
        return []
    }
}

function setLocalStorage(gameUser) {
    const users = getUsers()
    const userName = users.find(el => el.name === gameUser.name)
    if (userName  && userName.score < gameUser.score){
        userName.score = gameUser.score
        userName.mode = gameUser.mode
    }else if (userName && userName.score >= gameUser.score){
        users.filter(el => el.name !== gameUser.name)
    }else{
        users.push(gameUser)
    }
    localStorage.setItem("users", JSON.stringify(users))
}