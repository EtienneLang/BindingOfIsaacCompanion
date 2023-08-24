"use strict"
const guideHeadersChildren = document.getElementById("guideHeaders").children;
const guideHeaders = document.getElementById("guideHeaders");
const guideStepsSection = document.getElementById("guideSteps");
const BackButton = document.getElementById("backButton");
function loadGuide(event) {
    guideHeaders.classList.add("d-none");
    const backButton = document.createElement("div");
    backButton.classList.add("btn");
    backButton.classList.add("btn-primary");
    backButton.classList.add("btn-lg");
    backButton.innerHTML = "Back";
    BackButton.append(backButton);
    backButton.addEventListener("click", function () {
        guideHeaders.classList.remove("d-none");
        guideStepsSection.innerHTML = "";
        backButton.remove();
    })
    for (const steps in dataTextGuide[event.target.id]) {
        let div = document.createElement("div");
        div.classList.add("stretched-link");
        div.classList.add("guide-checkmarks");
        div.id = steps;
        div.addEventListener("click", gererClick);
        let p = document.createElement("p");
        p.innerHTML = dataTextGuide[event.target.id][steps][0];
        let img = document.createElement("img");
        img.src = dataTextGuide[event.target.id][steps][1];
        img.classList.add("h-100");
        div.append(p);
        div.append(img);
        guideStepsSection.append(div);
    }
}

function gererClick(event) {
    if (document.getElementById(event.target.id).classList.contains("checked")) {
        document.getElementById(event.target.id).classList.remove("checked");
    }
    else {
        document.getElementById(event.target.id).classList.add("checked");
    }
}
function initialisation() {
    for (let i = 0; i < guideHeadersChildren.length; i++) {
        guideHeadersChildren[i].addEventListener("click", loadGuide);
    }

}

window.addEventListener('load', initialisation)