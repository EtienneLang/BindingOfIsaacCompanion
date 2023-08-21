"use strict";

const buttonMainStats = document.getElementById("main-stats");
const buttonCharactersStats = document.getElementById("characters-stats");
const buttonItemsStats = document.getElementById("items-stats");
const divStatsAchievements = document.getElementById("stats-achievements");
const vectMainProgression = [];

let controleur = null;

function gererClickMenu(event) {
    if (event.target.id === "main-stats") {
        buttonMainStats.classList.add("active");
        buttonCharactersStats.classList.remove("active");
        buttonItemsStats.classList.remove("active");
    }
    else if (event.target.id === "characters-stats") {
        buttonMainStats.classList.remove("active");
        buttonCharactersStats.classList.add("active");
        buttonItemsStats.classList.remove("active");
    }
    else if (event.target.id === "items-stats") {
        buttonMainStats.classList.remove("active");
        buttonCharactersStats.classList.remove("active");
        buttonItemsStats.classList.add("active");
    }
}

async function createDicoMainStats() {
    const dataMainProgressionNotDone = dataMainProgression;
    const allGameAchievements = await getAllGameAchievement();
    const completedAchievementsList = await get_all_completed_achievements();
    for (const achievement in dataMainProgression) {
        for (let i=0; i < completedAchievementsList.length; i++){
            if(achievement === completedAchievementsList[i]){
                delete dataMainProgressionNotDone[achievement];
                break;
            }
        }
    }

    for (const achievement in dataMainProgressionNotDone) {
        dataMainProgressionNotDone[achievement][2] = allGameAchievements["game"]["availableGameStats"]["achievements"][achievement-1]["icon"];
    }
    return dataMainProgressionNotDone
}

async function afficherMainProgressionNotDone() {
    const dataMainProgressionNotDone = await createDicoMainStats();
    //Load à partir de la session, va falloir faire un truc pour que quand on met le steam
    //id dans la barre de recherche, ça mette à jour la session
    for (const achievement in dataMainProgressionNotDone) {
        const div1 = document.createElement("div");
        div1.classList.add("cardAchievement");
        div1.classList.add("card");
        div1.classList.add("text-white");
        div1.classList.add("bg-primary");
        div1.classList.add("m-3");
        div1.classList.add("text-center");
        const div2 = document.createElement("div");
        const pTitle = document.createElement("p");
        pTitle.innerHTML = dataMainProgressionNotDone[achievement][1];
        div2.append(pTitle);
        div2.classList.add("card-header");
        div1.append(div2);
        const div3 = document.createElement("div");
        div3.classList.add("card-body");
        const img = document.createElement("img");
        img.classList.add("img-fluid");
        img.src = dataMainProgressionNotDone[achievement][2];
        const p = document.createElement("p");
        p.classList.add("mt-2");
        p.innerHTML = dataMainProgressionNotDone[achievement][0];
        const pHref = document.createElement("a");
        pHref.href = "http://127.0.0.1:5000/api/guide";
        pHref.innerHTML = "How?";
        div3.append(img);
        div3.append(p);
        div3.append(pHref);
        div1.append(div3);
        divStatsAchievements.append(div1);
    }
}
async function initialisation() {
    buttonMainStats.addEventListener('click', gererClickMenu);
    buttonCharactersStats.addEventListener('click', gererClickMenu);
    buttonItemsStats.addEventListener('click', gererClickMenu);
}

window.addEventListener('load', initialisation);
window.addEventListener('load', afficherMainProgressionNotDone);