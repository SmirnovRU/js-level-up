'use strict'
let nameEl = document.getElementsByName('name')
let telEl = document.getElementsByName('tel')
let email = document.getElementsByName('email')
let inputText = document.querySelector('.input__name')
let formEl = document.querySelector('form')
let inputTel = document.querySelector('.input__tel')
let inputEmail = document.querySelector('.input__email')


formEl.addEventListener('submit', function(event){
    if (!(/[a-zа-я]/ig).test(nameEl[0].value)) {
        nameEl[0].classList.add('border__red')
        event.preventDefault()
        inputText.classList.add('input__block')
    }

    else {
        inputText.classList.remove('input__block')
        nameEl[0].classList.remove('border__red')
    }

    if (!(/^\+7\(\d{3}\)\d{3}-\d{4}/g).test(telEl[0].value)){
        telEl[0].classList.add('border__red')
        inputTel.classList.add('input__block')
        event.preventDefault()
    } 
    else {
        inputTel.classList.remove('input__block')
        telEl[0].classList.remove('border__red')
    }

    if (!(/^[\w.-]+@\w+\.[a-z]{2,4}/i).test(email[0].value)) {
        email[0].classList.add('border__red')
        event.preventDefault()
        inputEmail.classList.add('input__block')
    }
    else {
        inputEmail.classList.remove('input__block')
        email[0].classList.remove('border__red')
    }

})



