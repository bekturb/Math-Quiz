import {mode} from "./mode";

export const sections = document.querySelectorAll('.slider__item')
const form = document.querySelector('.form__submit')
const formControl = document.querySelector('.form-control')
const error = document.querySelector('.form-error')

let checkInputValue = false
let viewSections = -700;

form.addEventListener('click', (e) => {
    checkInput()

    if (checkInputValue === true) {
        sections.forEach(el => {
            el.style.transform = `translateY(${viewSections}px)`
        })
        mode(formControl.value)
        error.style.display = 'none'
    } else {
        error.style.display = 'block'
    }
})

function checkInput() {
    const formControlValue = formControl.value.trim()

    if (formControlValue === '') {
        checkInputValue = false
    } else {
        checkInputValue = true
    }
}