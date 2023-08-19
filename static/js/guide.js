"use strict"
const checkMarks = document.getElementsByClassName("guide-checkmarks");

function gererClickCheckMarks(event) {
    if (checkMarks[0].classList.contains("checked")) {
        checkMarks[0].classList.remove("checked");
    }
    else {
        checkMarks[0].classList.add("checked");
        console.log("checked");
    }
}


function initialisation() {
    for (let i = 0; i < checkMarks.length; i++) {
        checkMarks[i].addEventListener('click', gererClickCheckMarks);
    }

}

window.addEventListener('load', initialisation)