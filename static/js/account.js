"use strict"
const inputNom = document.getElementById("input_nom")
const inputEmail = document.getElementById("input_courriel")
const inputMDP = document.getElementById("input_mdp")
const inputDoubleMDP = document.getElementById("input_mdp_double")

const regExNom = /^[a-zA-Z0-9_]{3,30}$/
const regExEmail = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Za-z]{2,})+$/;


function validerNom(){
    if (inputNom.value.length < 3 || inputNom.value.length > 30) {
        inputNom.classList.add("is-invalid")
        inputNom.classList.remove("is-valid")

    }
    else{
        inputNom.classList.remove("is-invalid")
        inputNom.classList.add("is-valid")
    }
}

function validerEmail(){
    if (!regExEmail.test(inputEmail.value)) {
        inputEmail.classList.add("is-invalid")
        inputEmail.classList.remove("is-valid")
    }
    else{
        inputEmail.classList.remove("is-invalid")
        inputEmail.classList.add("is-valid")
    }
}

function validerMDP(){
    if (inputMDP.value.length < 5 || inputMDP.value.length > 30) {
        inputMDP.classList.add("is-invalid")
        inputMDP.classList.remove("is-valid")
    }
    else{
        inputMDP.classList.remove("is-invalid")
        inputMDP.classList.add("is-valid")
    }
}

function validerDoubleMDP(){
    if (inputMDP.value !== inputDoubleMDP.value) {
        inputDoubleMDP.classList.add("is-invalid")
        inputDoubleMDP.classList.remove("is-valid")
    }
    else{
        inputDoubleMDP.classList.remove("is-invalid")
        inputDoubleMDP.classList.add("is-valid")
    }
}

function initialisation() {
    inputNom.addEventListener("blur", validerNom)
    inputEmail.addEventListener("blur", validerEmail)
    inputMDP.addEventListener("blur", validerMDP)
    inputDoubleMDP.addEventListener("blur", validerDoubleMDP)
}

window.addEventListener('load', initialisation)