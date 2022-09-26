import {sections} from "./player";
import {math} from "./math";
import {leadBoard} from "./leadboard";

const formUserName = document.querySelector('.form__userName')
const formInput = document.querySelectorAll('.form__input')
const leadBoardBtn = document.querySelector('.about__leadboard')

export const mode = (user) => {
    formUserName.innerHTML = user

    formInput.forEach(el => {
        el.addEventListener("click", () => {
            sections.forEach(el => {
                el.style.transform = `translateY(-1400px)`
            })
            math(user, el.value)
        })
    })
}

leadBoardBtn.addEventListener("click", () => {
    sections.forEach(el => {
        el.style.transform = `translateY(-2800px)`
        leadBoard()
    })
})