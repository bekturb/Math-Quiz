import {sections} from "./player";
import {getUsers} from "./result";

const usersBack = document.querySelector(".users__back")
const usersList = document.querySelector(".info__list")
const select = document.querySelector("#modes")

let mode = 'Attack';

export const leadBoard = () => {
    const localUsers = getUsers()
    selectMode(localUsers)
}

select.addEventListener("change", (e) => {
    mode = e.target.value
    leadBoard()
})

function selectMode(localUsers){
    const selectUser = localUsers.filter(el => el.mode.toLowerCase() === mode.toLowerCase())
    renderUsers(selectUser)
}

function renderUsers(users) {
    usersList.innerHTML = ""

    users.sort((a,b) => b.score - a.score).filter(el =>{
        usersList.innerHTML +=
        `<li class="info__item">
            <h1 class="info__name">${el.name}</h1>
            <p class="info__number">${el.score}</p>
        </li>
        `
    })
}

usersBack.addEventListener("click", () => {
    sections.forEach(el => {
        el.style.transform = `translateY(-700px)`
    })
})